import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import _ from 'lodash';
//
// _. // _.를 입력하는 순간 로다시가 제공하는 API 목록을 IDE 상에서 확인 가능함 -> @types/lodash를 설치했으므로 타입스크립트는 로다시의 타입 정보를 알고 있음 (API 목록이 보여지지 않으면 사용 IDE가 타입스크립트를 지원하는지 확인)



// ReactDOM.render(<App />, document.getElementById('root')); // 필수 속성값을 일부러 입력하지 않음 -> 컴파일 에러 발생
ReactDOM.render(<App name={"starts"} age={13} />, document.getElementById('root')); // 필수 속성값을 입력
console.log('123'.padStart(5,'0')); // 문자열에 padStart 메서드가 없어 컴파일 에러가 발생함 -> padStart 메서드는 ES2017에 추가됨