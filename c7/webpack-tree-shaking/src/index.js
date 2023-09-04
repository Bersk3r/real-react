// import { func1 } from './util_esm'; // ESM 문법으로 작성된 모듈을 가져옴
// func1(); // func1만 사용하므로 웹팩을 실행 후 번들 파일을 열어보면 func2 함수가 보이지 않음 => 나무 흔들기 덕분에 func2 함수가 제거됨

// import { func1 } from './util_commonjs'; // commonJS 문법으로 작성된 모듈을 가져옴
// func1(); // func1만 사용하나, 웹팩 실행 후, 번들 파일을 열어보면 func2 함수가 보임

import('./util_esm').then(util => util.func1());