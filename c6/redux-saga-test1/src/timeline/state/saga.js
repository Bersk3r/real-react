import {all, call, put, take, fork, debounce } from "redux-saga/effects"; // 리덕스 사가에서 부수 효과를 발생시킬 때 사용할 함수를 가져옴 =>
import { actions, types } from "./index";
import { callApiLike } from "../../common/api"; // 좋아요 이벤트를 서버로 전송하는 비동기 함수를 가져옴

export function* fetchData(action) { // REQUEST_LIKE 액션을 처리하는 제너레이터 함수이며, 이를 사가 함수라고 함
  while(true) { // 이 함수는 무한 반복함
    const { timeline } = yield take(typs.REQUEST_LIKE); // REQUEST_LIKE 액션 객체에는 timeline 객체가 들어있음 
    yield put(actions.setLoading(true));  // 결과적으로 store.dispatch 메서드를 호출하는 효과가 있음
    yield put(actions.addLike(timeline.id,1)); // put 함수를 이용하여 좋아요 숫자를 증가시키는 액션을 발생시킴
    yield put(actions.setError('')); // 새로운 좋아요 요청이 들어오면 이전의 에러 정보는 초기화함
    try {
      yield call(callAPiLike); // 여기에선 서버에서 응답이 올 때까지 기다림 => callApiLike에서 프로미스 객체를 거부됨 상태로 만드는 경우를 처리하기 위해 try/catch문을 사용함
    } catch {
      yield put(actions.setError(error)); // 프로미스 객체가 거부됨 상태가 되면 에러 객체를 저장하는 액션을 발생시킴
      yield put(actions.addLike(timeline.id, -1)); // 미리 증가시켰던 좋아요 숫자를 감소시키는 액션을 발생시킴
    }
    yield put(actions.setLoading(false)); // 로딩이 끝났다는 것을 알리는 액션을 발생시킴 => 이것으로 REQUEST_LIKE 액션에 대한 처리가 끝나고 새로운 REQUEST_LIKE 액션이 발생될 때 까지 대기함
  }
}

export function* trySetText(action) {
  const { text } = action;
  yield put(actions.setText(text));
}
export default function* watcher() { // 여러 개의 사가 함수를 모아 놓은 함수로 나중에 사가 미들웨어 입력됨
  // yield all([fork(fetchData)]);
  yield all([fork(fetchData), debounce(500, typs.TRY_SET_TEXT, trySetText)]); // TRY_SET_EXT 액션이 발생하고 0.5초 동안 재발생하지 않으면 trySetText 사가 함수를 실행함
}

/**리덕스 사가의 부수 효과 함수가 반환하는 값*/
// const a = take(types.REQUEST_LIKE); // take, put, call 함수를 실행한 결과를 로그로 출력함
// const b = put(actions.setLoading(false));
// const c = call(callApiLike);
// console.log({a, b, c});
//
// const logResult = { // 로그로 출력된 결과를 자바스크립트 객체로 표현함
//     a: { // take 함수의 반환값임 => pattern이라는 속성값의 이름에서 알 듯이 take 함수는 여러 개의 액션을 기다릴 수 있음
//       TAKE: {
//         pattern: 'timeline/REQUEST_LIKE',
//       },
//     },
//     b: { // put 함수의 반환 값이며, 호출 시 입력했던 액션 객체를 담고 있음
//       PUT: {
//         channel: null,
//         action: {
//           type: 'timeline/SET_LOADING',
//           isLoading: false,
//         },
//       },
//     },
//     c: { // call 함수의 반환값이며, 호출 시 입력한 함수를 담고 있음
//       CALL: {
//         context: null,
//         fn: callApiLike,
//         args: [],
//       },
//     },
// };

/**로그인과 로그아웃 액션을 처리하는 사가 함수*/
// function* loginFlow() {
//   while(true) {
//     const { id, password } = yield take(types.LOGIN); // 로그인 액션이 발생할 때까지 대기
//     const userInfo = yield call(callApiLogin, id, password); // 로그인 액션이 발생하면 서버로 로그인 요청을 보냄
//     yield put(types.SET_USER_INFO, userInfo); // 서버로부터 사용자가 정보가 도착하면 사용자 정보를 저장하는 액션을 발생시킴
//     yield take(types.LOGOUT); // 로그아웃 애겻닝 발생할 때까지 대기
//     yield call(callApiLogout, id); // 로그아웃 애겻ㄴ이 발생하면 서버로 로그아웃 요청을 보냄
//     yield put(types.SET_USER_INFO, null); // 로그아웃에 성공하면 사용자 정보를 지움
//   }
// }
//
//
