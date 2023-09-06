import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const initialData = window.__INITIAL_DATA__; // 서버로부터 전달된 초기 데이터를 가져옴
// ReactDom.hydrate(<App page="home" />, document.getElementById('root'));
ReactDom.hydrate(<App page={initialData.page} />, document.getElementById('root')); // 전달 받은 데이터를 속성값으로 입력함
// ReactDom.render(<App page="home" />, document.getElementById('root'));