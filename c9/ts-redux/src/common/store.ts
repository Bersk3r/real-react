import { createStore } from 'redux';
import { combineReducers } from 'redux';
import person, { StatePerson } from "../person/state/reducer";
import product, { StateProduct } from '../product/state/reducer';

export interface ReduxState { // 모든 리듀서의 상탯값의 타입을 ReduxState로 모음
    person: StatePerson;
    product: StateProduct;
}

const reducer = combineReducers<ReduxState>({ // combineReducers 함수의 제네릭으로 ReduxState를 입력함
    person,
    product,
});

export const store = createStore(reducer);