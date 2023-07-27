import {createStore, combineReducers} from "redux";
import timelineReducer, { // 친구 목록과 타임라인 모듈에서 액션 생성자 함수와 리듀서 함수를 가져옴
    addTimeLine,
    removeTimeLine,
    editTimeLine,
    increaseNextPage,
} from "./timeline/state";

import friendReducer, {
    addFriend,
    removeFriend,
    editFriend,
} from "./friend/state";

const reducer = combineReducers({ // combineReducers 함수를 이용해서 두 개의 리듀서를 하나로 합침 (상탯값엔 timeline, friend라는 이름으로 데이터가 저장됨)
    timeline: timelineReducer,
    friend: friendReducer,
});
const store = createStore(reducer); // 스토어 생성
store.subscribe(() => { // 디버깅을 위해 액션 처리가 끝날 때마다 상탯값을 로그로 출력함
    const state = store.getState();
    console.log(state);
});
store.dispatch(addTimeLine({id: 1, desc: '코딩은 즐거워'})); // 타임라인을 테스트하기 위해 다섯 개의 액션을 생성
store.dispatch(addTimeLine({id: 2, desc: '리덕스 좋아'}));
store.dispatch(increaseNextPage());
store.dispatch(editTimeLine({id: 2, desc: '리덕스 너무 좋아'}));
store.dispatch(removeTimeLine({id: 1, desc: '코딩은 즐거워'}));

store.dispatch(addFriend({id: 1, name: '아이유'})); // 친구 목록을 테스트하기 위해 네 개의 액션을 생성
store.dispatch(addFriend({id: 2, name: '손나은'}));
store.dispatch(editFriend({id: 2, name: '수지'}));
store.dispatch(removeFriend({id: 1, name: '아이유'}));