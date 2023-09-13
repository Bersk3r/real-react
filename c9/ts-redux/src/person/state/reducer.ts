import { ActionType, actions } from "./action";
import { createReducer } from "../../common/redux";

export interface StatePerson { // 인터페이스로 상탯값의 타입을 정의함
    name: string;
    age: number;
}

const INITIAL_STATE = { // 초기 상탯값을 정의함
    name: 'empty',
    age: 0,
};

type Action = ReturnType<typeof actions[keyof typeof actions]>; // ReturnType 내장 타입을 이용해서 모든 액션 객체의 타입을 유니온 타입으로 만듦
export default createReducer<StatePerson, ActionType, Action>(INITIAL_STATE, { // createReducer 함수를 이용해서 리듀서를 만듦, 이 때 상탯값의 타입과 모든 액션 객체의 유니온 타입을 제네릭으로 입력함
    [ActionType.SetName]: (state, action) => { state.name = action.payload.name }, // 타입스크립트는 이 줄의 action.payload가 SetName 액션 객체의 데이터라는 것을 알고 있어야 함, 따라서 name이 아닌 다른 데이터를 사용하려고 시도하면 타입 에러가 발생함
    [ActionType.SetAge]: (state, action) => { state.age = action.payload.age },
});