import createReducer from "../common/createReducer";

const ADD = "friend/ADD"; // 액션 변수를 상수 변수로 정의
const REMOVE = "friend/REMOVE";
const EDIT = "friend/EDIT";

export const addFriend = friend => ({type: ADD, friend}); // 액션 생성자 함수 정의 => 이 함수는 외부에서 사용함로 export 키워드를 사용해 외부에 공개함
export const removeFriend = friend => ({type: REMOVE, friend});
export const editFriend = friend => ({type: EDIT, friend});

const INITIAL_STATE = { friends: [] };
const reducer = createReducer(INITIAL_STATE, { // 친구 데이터를 추가, 삭제, 수정하는 리듀서 코드임
    [ADD] : (state, action) => state.friends.push(action.friend),
    [REMOVE] : (state, action) =>
        (state.friends = state.friends.filter(
            friend => friend.id !== action.friend.id
        )),
    [EDIT]: (state, action) => {
        const index = state.friends.findIndex(
            friend => friend.id === action.friend.id
        );
        if(index >= 0) {
            state.friends[index] = action.friend;
        }
    }
});
export default reducer; // 리듀서는 스토어를 생성할 때, 필요하기 때문에 외부로 공개함 