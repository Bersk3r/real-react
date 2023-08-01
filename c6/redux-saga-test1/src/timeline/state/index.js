import createReducer from "../../common/createReducer";
import createItemsLogic from "../../common/createItemLogic";
import mergeReducers from "../../common/mergeReducers"; // 공통 로직을 사용하기 위해 mergeReducers 함수를 사용함

export const types = { // 리덕스 사가에서 사용할 목적으로 모든 액션 타입을 하나의 객체에 담아서 내보냄 => 기존에는 각 액션 생성자 함수를 개별적으로 내보내고, 가져가는 쪽에서는 import * as actions 코드를 이용하여 모든 액션 생성자 함수를 가져감
    INCREASE_NEXT_PAGE: 'timeline/INCREASE_NEXT_PAGE',
    REQUEST_LIKE: "timeline/REQUEST_LIKE", // 종하요 버튼을 클릭하면 나타나는 액션 타입임 => 해당 액션 타입은 리덕스 사가에서만 사용되고, 리듀서 함수에서는 사용되지 않음
    ADD_LIKE: "timeline/ADD_LIKE", // 좋아요 숫자를 변경할 때 사용할 액션 타입임
    SET_LOADING: "timeline/SET_LOADING", // 로딩 여부를 알려 줄 액션 타입임
    SET_ERROR: "timeline/SET_ERROR", // 에러 정보를 저장하는 SET_ERROR 액션 타입을 추가함
    SET_TEXT: "timeline/SET_TEXT", // 리덕스의 text 상탯값을 변경하는 액션 타입을 추가함
    TRY_SET_TEXT: "timeline/TRY_SET_TEXT", // 리덕스의 text 상탯값 변경을 시도하는 액션 타입임  => TRY_SET_TEXT 액션 타입을 사가 함수에서만 사용됨, 리듀서에서는 TRY_SET_TEXT 액션 타입을 처리하지 않음
};

export const actions = { // 액션 타입 객체도 내보내므로 액션 생성자 함수도 하나의 객체에 담아서 내보냄
    addTimeline: add, // 액션 생성자 함수를 추가함
    removeTimeline: remove,
    editTimeline: edit,
    increaseNextPage: () => ({type: types.INCREASE_NEXT_PAGE}),
    requestLike: timeline => ({tpye: types.REQUEST_LIKE, timeline}),
    addLike: (timelineId, value) => ({type: types.ADD_LIKE, timelineId, value}),
    setLoading: isLoading => ({
        type: types.SET_LOADING,
        isLoading
    }),
    setError: error => ({
        type: types.SET_ERROR,
        error
    }),
    setText: text => ({
        type: types.SET_TEXT,
        text,
    }),
    trySetText: text => ({
        type: types.TRY_SET_TEXT,
        text,
    }),
};

const INITIAL_STATE = { nextPage: 0, isLoading: false, error: "", text: ""}; // 로딩 상탯값을 추가함, error 상탯값의 초기 값은 빈 문자열임, text의 상탯값을 빈 문자열로 설정함
const reducer = createReducer(INITIAL_STATE, { // 리듀서 코드를 추가함
    [types.INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
    [types.ADD_LIKE]: (state, action) => {
        const timeline = state.timelines.find(
          item => item.id === action.timelineId
        );
        if(timeline) {
            timeline.likes += action.value;
        }
    },
    [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
    [types.SET_ERROR]: (state, action) => (state.error = action.error),
    [types.SET_TEXT] : (state, action) => (state.text = action.text),
});

export default mergeReducers(reducers); // 해당 함수는 리듀서 함수의 배열을 입력으로 받음


// export default reducer;