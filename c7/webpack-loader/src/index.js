import React from 'react';
import ReactDOM from 'react-dom';
// import Style from './App.css'; // 자바스크립트 모듈에서 CSS 모듈을 불러옴, 현재에는 CSS 모듈을 처리하는 로더가 없으므로 웹팩을 실행하면 에러가 발생함
import './App.css'
import Icon from './icon.png';
import Json from './data.json';
import Text from './data.txt';

// console.log({ Style });

export function App() {
    return (
        <div className="container">
            <h3 className="title">webpack example</h3>
            <div>{`name: ${Json.name}, age: ${Json.age}`}</div>
            <div>{Text}</div>
            <img src={Icon} alt="CopyCat" />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));