const express = require('express');
const next = require('next');
const url = require('url');
const lruCache = require('lru-cache'); // 서버사이드 렌더링 결과를 캐싱하기 위해 lru-cache 패키지를 이용함

const ssrCache = new lruCache({ // 최대 100개의 항목을 저장하고 각 항목은 60초동안 저장함
    max: 100,
    maxAge: 1000 * 60,
});

const port = 3000;
const dev = process.env.NODE_ENV !== 'production'; // NODE_ENV 환경 변수에 따라 개발 모드와 프로덕션 모드를 구분함
const app = next({dev}); // 넥스트를 실행하기 우해 필요한 객체와 함수를 생성함
const handle = app.getRequestHandler();

app.prepare().then(() => { // 넥스트의 준비 과정이 끝나면 입력된 함수를 실행함
    const server = express();
    server.get('/page/:id', (req, res) => { // express 웹 서버에서 처리할 url 패턴을 등록함, 여기선 /page/1 요청이 들어오면 /page1으로 리다이렉트함
        res.redirect(`/page${req.params.id}`);
    });
    server.get(/^\/page[1-9]/, (req, res) => { // page1~9 요청에 대해 서버사이드 렌더링 결과를 캐싱함
        return renderAndCache(req, res);
    });
    server.get('*', (req, res) => { // 나머지 모든 요청은 handle 함수가 처리하도록 함
        return handle(req, res);
    });

    server.listen(port, err => { // 사용자 요청을 처리하기 위해 대기함
        if(err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

async function renderAndCache(req, res) { // renderAndCache ㅎ마수에서 캐싱 기능을 구현함 -> 이 함수는 async await 문법을 이용함
    const parsedUrl = url.parse(req.url, true);
    const cacheKey = parsedUrl.path; // 쿼리 파라미터가 포함된 경로를 키로 사용함
    if(ssrCache.has(cacheKey)) { // 캐시가 존재하면 캐시에 저장된 값을 사용함
        console.log('캐시 사용');
        res.send(ssrCache.get(cacheKey));
        return;
    }
    try {
        const { query, pathname } = parsedUrl;
        const html = await app.renderToHTML(req, res, pathname, query); // 캐시가 없으면 넥스트의 renderToHTML 메서드를 호출하고, await 키워드를 사용해서 처리가 끝날때까지 기다림
        if(res.statusCode === 200) {
            ssrCache.set(cacheKey, html); // renderToHTML 함수가 정상적으로 처리되었으면 그 결과를 캐싱함
        }
        res.send(html);
    } catch(err) {
        app.renderError(err, req, res, pathname, query);
    }
}