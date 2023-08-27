const element = <div>babel test</div>; // 전체 설정 파일의 리액트 프리셋 적용됨
const text = `element type is ${element.type}`; // 지역 설정 파일의 템플릿 리터럴 플러그인이 적용됨, 전체 설정 파일의 loose 옵션이 적용되지 않은 것을 확인할 수 있음, 지역 설정이 전체 설정을 덮어쓰므로
const add = (a,b) => a + b;
