interface Window {
    myValue: number; // window 객체에 myValue 속성을 추가함 -> 기존 정의된 Window 타입에 우리가 작성한 속성이 추가됨
}

declare module '*.png' { // 타입스크립트에 png 확장자를 가지는 모듈이 타입이 문자열이라고 알려줌
    const content: string;
    export default content;
}