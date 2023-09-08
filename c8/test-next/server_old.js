const express = require('express');
const next = require('next');


const port = 3000;
const dev = process.env.NODE_ENV !== 'production'; // NODE_ENV 환경 변수에 따라 개발 모드와 프로덕션 모드를 구분함
const app = next({dev}); // 넥스트를 실행하기 우해 필요한 객체와 함수를 생성함
const handle = app.getRequestHandler();

app.prepare().then(() => { // 넥스트의 준비 과정이 끝나면 입력된 함수를 실행함
    const server = express();
    server.get('/page/:id', (req, res) => { // express 웹 서버에서 처리할 url 패턴을 등록함, 여기선 /page/1 요청이 들어오면 /page1으로 리다이렉트함
        res.redirect(`/page${req.params.id}`);
    });
    server.get('*', (req, res) => { // 나머지 모든 요청은 handle 함수가 처리하도록 함
        return handle(req, res);
    });

    server.listen(port, err => { // 사용자 요청을 처리하기 위해 대기함
        if(err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
