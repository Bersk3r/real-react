// common.js 내용이 server.js와 유사함
import fs from 'fs';
import path from 'path';
import { renderToString } from "react-dom/server";
import React from 'react';
import App from './App';
import { ServerStyleSheet } from "styled-components";

const html = fs.readFileSync( // 미리 html 파일의 내용을 가져옴
    path.resolve(__dirname, '../dist/index.html'),
    'utf8'
);

export const prerenderPages = ['home']; // 미리 렌더링할 페이지의 목록을 정의함

export function renderPage(page) { // 페이지를 미리 렌더링하여 문자열을 반환하는 함수로 server.js 파일에서 렌더링하던 부분과 유사함
    // 해당 함수에서 __DATA_FROM_SERVER__ 문자열은 그대로 유지함, renderPage 함수에서 데이터에 대한 정보를 모르기 때문임, prerender.js에선 __DATA_FROM_SERVER__ 문자열을 변환하지 못한 채로 각 페이지의 HTML 파일을 저장함 -> 데이터는 서버에서 사용자 요청을 할 때 채워넣을 예정임
    const sheet = new ServerStyleSheet();
    const renderString = renderToString(sheet.collectStyles(<App page={page} />));
    const styles = sheet.getStyleTags();
    const result = html
        .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
        .replace('__STYLE_FROM_SERVER__', styles);
    return result;
}