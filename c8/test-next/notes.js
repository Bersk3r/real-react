/**user-agent 정보를 추출하여 데이터로 전달하는 코드*/
MyComponent.getInitialProps = async({req}) => { // HTTP 요청 객체도 getInitialProps ㅎ마수의 매개변수로 전달됨
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent; // HTTP 요청 객체가 존재하면 헤더에서 user-agent 정보를 추출하고, 클라이언트에서 호출되는 경우엔 브라우저의 navigator 전역 변수를 이용함
    // ...
}