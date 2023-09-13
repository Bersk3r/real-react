import React from 'react';
import { getValue } from './legacy'; // 타입스크립트에서 자바스크립트 파일을 가져옴, npx tsc 명령어를 실행해보면 자바스크립트를 가져오는 부분에서 컴파일 에러가 발생함 -> tsconfig.json 내 "allowJS" : true로 작성
import Icon from './icon.png'; // 확장자가 png인 파일을 가져오려고 하면 컴파일 에러가 발생함 -> 타입 스크립트가 png 모듈의 타입을 모르므로

window.myValue = 123; // window 객체에 우리가 원하는 속성을 추가하고자 하는 경우가 있지만, 타입스크립트는 myValue 속성이 없다며 에러가 발생함
// function App({name, age}:  { name: string; age: number; }) { // 두 속성 값은 필수 값임
export default function({name, age}:  { name: string; age: number; }) { // 두 속성 값은 필수 값임
    const value = getValue();
    // console.log(value.substr(0, 10)); // 타입스크립트가 getValue 함수의 반환 타입이 숫자라는 것을 파악함 -> substr을 toFixed로 변경하면 해결됨
    console.log(value.toFixed(0)); // 타입스크립트가 getValue 함수의 반환 타입이 숫자라는 것을 파악함 -> substr을 toFixed로 변경하면 해결됨
    return (
        <div>
            <img src={Icon} />
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}
// export default App;