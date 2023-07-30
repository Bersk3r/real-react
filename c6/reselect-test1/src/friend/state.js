import createReducer from "../common/createReducer";
import createItemsLogic from "../common/createItemLogic";
import mergeReducers from "../common/mergeReducers";
import {MAX_AGE_LIMIT, MAX_SHOW_LIMIT} from "./common";

const { add, remove, edit, reducer: friendReducer } = createItemsLogic(
  "friends"
);

const SET_AGE_LIMIT = "friend/SET_AGE_LIMIT"; // 연령 제한과 개수 제한 정보를 처리하는 액션 타입 작성
const SET_SHOW_LIMIT = "friend/SET_SHOW_LIMIT";

export const addFriend = add; // 연령 제한과 개수 제한 정보를 처리하는 액션 생성자 함수 작성
export const removeFriend = remove;
export const editFriend = edit;
export const setAgeLimit = ageLimit => ({ type: SET_AGE_LIMIT, ageLimit});
export const setShowLimit = showLimit => ({ type: SET_SHOW_LIMIT, showLimit});

const INITIAL_STATE = { ageLimit: MAX_AGE_LIMIT, showLimit: MAX_SHOW_LIMIT}; // 초기값으로 두 값의 최댓값을 넣음
const reducer = createReducer(INITIAL_STATE, { // 연령 제한과 개수 제한 정보를 처리하는 리듀서 함수 작성
  [SET_AGE_LIMIT]: (state, action) => (state.ageLimit = action.ageLimit),
  [SET_SHOW_LIMIT]: (state, action) => (state.showLimit = action.showLimit)
});
const reducers = [reducer, friendReducer];
export default mergeReducers(reducers); // 친구 목록을 처리하는 리듀서 함수와 하나로 합침

