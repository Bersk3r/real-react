const express = require('express');

const server = express();
server.use(express.static('out'));  // 단순히 out 폴더 밑의 정적 파일을 서비스하도록 설정
server.listen(3000, err => {
    if(err) throw err;
});