// import createReducer from "../common/createReducer";
//
// const ADD = 'timeline/ADD';
// const REMOVE = 'timeline/REMOVE';
// const EDIT = 'timeline/EDIT';
// const INCREASE_NEXT_PAGE = 'timeline/INCREASE_NEXT_PAGE'; // 타임 라인의 끝에 도달했을 때, 서버에게 요청할 페이지 번호를 관리하는 액션 타입
//
// export const addTimeLine = timeline => ({type: ADD, timeline});
// export const removeTimeLine = timeline => ({type: REMOVE, timeline});
// export const editTimeLine = timeline => ({type: EDIT, timeline});
// export const increaseNextPage = () => ({type: INCREASE_NEXT_PAGE}); // 페이지 번호를 증가시키는 액션 생성자 함수
//
// const INITIAL_STATE = { timelines: [], nextPage: 0}; // 타임라인의 상탯값에는 다음 페이지 번호도 저장됨
// const reducer = createReducer(INITIAL_STATE, {
//     [ADD]: (state, action) => state.timelines.push(action.timeline),
//     [REMOVE]: (state, action) =>
//         (state.timelines = state.timelines.filter(
//             timeline => timeline.id !== action.timeline.id,
//         )),
//     [EDIT]: (state, action) => {
//         const index = state.timelines.findIndex(
//             timeline => timeline.id === action.timeline.id,
//         );
//         if(index >= 0) {
//             state.timelines[index] = action.timeline;
//         }
//     },
//     [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1), // 페이지 번호를 증가시키는 리듀서 코드
// });

/**간소화된 코드*/
import createReducer from "../common/createReducer";
import createItemsLogic from "../common/createItemLogic";
import mergeReducers from "../common/mergeReducers"; // 공통 로직을 사용하기 위해 mergeReducers 함수를 사용함

const { add, remove, edit, reducer: timelinesReducer } = createItemsLogic( // timelines라는 이름으로 공통 로직을 생성함
  "timelines"
);

const INCREASE_NEXT_PAGE = "timeline/INCREASE_NEXT_PAGE"; // 공통 로직에 포함되지 않는 액션 타입, 액션 생성자 함수, 리듀서 코드를 직접 정의함

export const addTimeline = add;
export const removeTimeline = remove;
export const editTimeline = edit;
export const increaseNextPage = () => ({type: INCREASE_NEXT_PAGE});

const INITIAL_STATE = { nextPage: 0 };
const reducer = createReducer(INITIAL_STATE, {
    [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1)
});

const reducers = [reducer, timelinesReducer]; // mergeReducers 함수를 사용하여 공통 로직의 리듀서 함수와 직접 작성한 리듀서 함수를 합침
export default mergeReducers(reducers); // 해당 함수는 리듀서 함수의 배열을 입력으로 받음


// export default reducer;