/**이벤트 객체와 이벤트 처리 함수의 타입*/
// import React from 'react';
// type EventObject<T = HTMLElement> = React.SyntheticEvent<T>; // 리액트에서 발생되는 대부분의 이벤트 객체는 EventObject 타입으로 정의할 수 있음 -> 특정 이벤트에 특화된 타입을 원한다면 제네릭 T에 원하는 타입을 입력함
// type EventFunc<T = HTMLElement> = (e: EventObject<T>) => void; // 대부분의 이벤트 처리 함수를 EventFunc로 정의할 수 있음 -> 원하는 타입을 제네릭 T에 입력할 수 있음