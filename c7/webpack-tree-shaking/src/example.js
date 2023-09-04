/**lodash 모듈의 잘못된 사용 에시 */
// import { fill } from 'loadsh'; // 여기서 lodash의 fill 함수만 사용하나 웹팩으로 만들어진 번들 파일에는 lodash의 모든 코드가 포함됨
// const arr = [1,2,3];
// fill(arr, 'a');

/** lodash를 잘 사용한 예 1 */
// import fill from 'loadsh/fill';
// const arr = [1,2,3];
// fill(arr, 'a');
