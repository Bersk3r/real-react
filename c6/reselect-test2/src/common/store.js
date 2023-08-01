import {createStore, combineReducers} from "redux";
import timelineReducer from "../timeline/state";
import friendReducer from "../friend/state";

const reducer = combineReducers({ // combineReducers 함수를 이용해서 두 개의 리듀서를 하나로 합침 (상탯값엔 timeline, friend라는 이름으로 데이터가 저장됨)
  timeline: timelineReducer,
  friend: friendReducer,
});
const store = createStore(reducer); // 스토어 생성
export default store; // 스토어 객체를 내본낸다. 이제 스토어 객체를 원하는 곳에서 사용할 수 있음