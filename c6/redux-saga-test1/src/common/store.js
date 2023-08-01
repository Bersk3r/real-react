import {createStore, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import timelineSaga from "../timeline/state/saga";
import timelineReducer from "../timeline/state";
import friendReducer from "../friend/state";

const sageMiddleware = createSagaMiddleware(); // 사가 미들웨어 함수를 만ㄷ름
const store = createStore(reducer, applyMiddleware(sageMiddleware)); // 스토어를 생성할 때 입력함
export default store; // 스토어 객체를 내보낸다. 이제 스토어 객체를 원하는 곳에서 사용할 수 있음
sagaMiddleware.run(timelineSaga); // 사가 미들웨어에 작성한 함수를 입력함

// const reducer = combineReducers({ // combineReducers 함수를 이용해서 두 개의 리듀서를 하나로 합침 (상탯값엔 timeline, friend라는 이름으로 데이터가 저장됨)
//   timeline: timelineReducer,
//   friend: friendReducer,
// });
