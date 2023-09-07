/**간단한 웹 서버 코드*/
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString, renderToNodeStream } from "react-dom/server"; // react-dom/server 밑에 서버에서 사용되는 기능이 주요 존재함
import React from "react"; // common.js 파일에 있던 내용의 상당 부분이 가져와야 하므로 관련된 모듈도 가져옴
import App from './App';
import * as url from 'url';
import { ServerStyleSheet } from 'styled-components';
import { renderPage, prerenderPages} from "./common";
import lruCache from 'lru-cache'; // 캐싱을 위해 lru-cache 패키지를 이용함
import { Transfrom } from 'stream'; // 중간에 삽입할 스트림을 만들기 위해 Transform 클래스를 가져옴

function createCacheStream(cacheKey, prefix, postfix) { // 중간에 삽이할 스트림을 생성해주는 ㅎ마수
    const chunks = []; // 스트림으로 전달된 모든 청크 데이터를 저장하는 배열임
    return new Transform({ // Transform 객체를 생성하며, 이는 읽기와 쓰기가 모두 가능한 스트림 객체임
        transform(data, _, callback) { // 청크 데이터를 받으면 호출되는 함수임 -> 전달받은 청크 데이터를 그대로 chunks 배열에 넣음
            chunks.push(data);
            callback(null, data);
        },
        flush(callback) { // 청크 데이터가 모두 전달된 후 호출되는 함수임 -> 모든 청크 데이터와 prefix, postfix를 이용하여 하나의 완성된 HTML 데이터를 만들고 캐싱함
            const data = [ prefix, Buffer.concat(chunks).toString(), postfix];
            ssrCache.set(cacheKey, data.join(''));
            callback();
        },
    });
}

const ssrCache = new lruCache({ // 최대 100개의 페이지를 캐싱하고 각 아이템은 60초 동안 캐싱되도록 설정함
    max: 100,
    maxAge: 1000 * 60,
});

const app = express(); // express 객체인 app 변수를 이용하여 미들웨어와 url 경로 설정이 가능함

const html = fs // dist/index.html 파일의 내용도 가져옴 -> 스트림 방식에서는 더 이상 __STYLE_FROM_SERVER__ 문자열은 사용하지 않으므로 삭제함
    .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
    .replace('__STYLE_FROM_SERVER__', '');

const prerenderHtml = {}; /// prerender.js 파일이 실행될 때 미리 렌더링해 놓은 페이지를 prerenderHtml 객체에 저장함
for(const page of prerenderPages) {
    const pageHtml = fs.readFileSync(
        path.resolve(__dirname, `../dist/${page}.html`),
        'utf8',
    );
    prerenderHtml[page] = pageHtml;
}


app.use('/dist', express.static('dist'));
app.get('./favicon.ico', (req, res) => res.sendStatus(204)); // 브라우저가 자동으로 요청하는 favicon.ico 파일이 하기 코드에서 처리되지 않도록 막음
app.get('*', (req, res) => { // 나머지 모든 경우를 처리하는 함수를 등록함
    const parsedUrl = url.parse(req.url, true); // 문자열로 된 주솟값을 구조체로 변환하기 위해 url 모듈을 사용함
    const cacheKey = parsedUrl.path; // cacheKey는 쿼리 파라미터를 포함하는 url로 함 -> 만약 페이지를 렌더링할 때, user-agent와 같은 추가 정보를 이용한다면, cacheKey는 그 정보들을 모두 포함해야 함
    if (ssrCache.has(cacheKey)) { // 캐시가 존재하면 캐싱된 값을 이용함
        console.log('캐시 사용');
        res.send(ssrCache.get(cacheKey));
        return;
    }
    const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
    const initialData = {page}; // 클라이언트에게 전달할 초기 데이터

    // const pageHtml = prerenderPages.includes(page)  // 미리 렌더링된 페이지가 아닌 경우에만 새로 렌더링함
    //     ? prerenderHtml[page]
    //     : renderPage(page);
    const isPrerender = prerenderPages.includes(page); // 미리 렌더링하는 페이지인지의 여부를 isPrerender 변수에 저장함
    // const result = pageHtml.replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)); // __DATA_FROM_SERVER__ 문자열을 초기 데이터로 대체함
    const result = (isPrerender ? prerenderHtml[page] : html).replace( // HTML에 초기 데이터를 넣음 -> 미리 렌더링하는 페이지는 이 작업을 끝으로 HTML이 완성됨
        '__DATA_FROM_SERVER__',
        JSON.stringify(initialData),
    );
    if (isPrerender) { // 미리 렌더링하는 페이지를 캐시에 저장 후 전송함
        ssrCache.set(cacheKey, result);
        res.send(result);
    } else {
        const ROOT_TEXT = '<div id="root">'; // root 요소를 기준으로 이전 문자열과 이후 문자열로 나뉨
        const prefix = result.substr(
            0,
            result.indexOf(ROOT_TEXT) + ROOT_TEXT.length,
        );
        const postfix = result.substr(prefix.length);
        res.write(prefix); // 이전 문자열은 바로 전송함 -> write 메서드는 여러번 호출이 가능하면 end 메서드를 호출해야 전송이 종료됨

        const sheet = new ServerStyleSheet();
        const reactElement = sheet.collectStyles(<App page={page}/>);
        const renderStream = sheet.interleaveWithNodeStream(
            // rednerToNodeStream 함수를 호출하여 읽기 가능한 스트림 객체를 만듦 -> 스트림 방식을 사용할 때는 styled-components의 interleaveWithNodeStream 메서드를 호출해야 함
            // interleaveWithNodeStream 메서드는 rednerStream에서 스타일 코드가 생성되도록 하는 역할을 하며, 기존에는 스타일 코드를 __STYLE_FROM_SERVER__ 부분에 삽입하였으나 이제는 root 요소 내부에 삽입함
            renderToNodeStream(reactElement),
        );
        const cacheStream = createCacheStream(cacheKey, prefix, postfix); //  직접 생성한 스트림을 두 스트림 사이에 연결함 (청크 데이터 흐름 : renderStream -> cacheStream -> res)
        cacheStream.pipe(res);
        renderStream.pipe( // renderStream 스트림과 res 스트림의 연결을 종료함 -> res는 쓰기 가능한 스트림이며, { end: false } 옵션은 스트림이 종료되었을 때 res.end 메서드가 자동으로 호출되지 않도록 함
            res,
            {end: false},
        );
        renderStream.on('end', () => {
            res.end(postfix); // 스트림이 종료되면 마지막으로 postfix 데이터를 전송함
        });
    }
});
app.listen(3000); // 매개변수는 포트번호를 의미하며 3000 포트로 들어오는 클라이언트의 요청을 기다림