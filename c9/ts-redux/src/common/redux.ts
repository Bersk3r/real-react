import produce from 'immer';

interface TypedAction<T extends string> { // 액션 객체의 타입임, 데이터가 있는 경우와 없는 경우를 각각 정의하기 위해 두 개의 타입을 정의함
    type: T;
}
interface TypePayloadAction<T extends string, P> extends TypedAction<T> {
    payload: P;
}

export function createAction<T extends string>(type: T): TypedAction<T>; // 액션 생성자 함수의 타입이며, 데이터 유무를 구별하기 위해 함수 오버로드를 이용함
export function createAction<T extends string, P>(
    type: T,
    payload: P,
): TypePayloadAction<T,P>;
//@ts-ignore
export function createAction(type, payload?) {
    return payload !== undefined ? {type, payload} : {type};
}

export function createReducer<S, T extends string, A extends TypedAction<T>>( // 리듀서를 생성하는 함수의 타입임, S는 상탯값의 타입이고 T는 액션 타입을 의미함, A는 모든 액션 객체의 유니온 타입임
    initialState: S, // 초기 상탯값을 첫 번째 매개변수로 받음
    handlerMap: { // 모든 액션 처리 함수가 담긴 객체를 두 번째 매개변수로 받음
        [key in T]: (state: Draft<S>, action: Extract<A, TypedAction<T>>) => void; // 이 코드에 의해 타입스크립트는 각 액션 객체가 가진 payload 타입을 알 수 있음, 리듀서 코드 작성 시 액션 처리 함수에서 payload.를 입력하면 해당 액션 객체가 가진 데이터 목록을 확인 가능함 -> 잘못된 이름의 데이터를 사용하려고 하면 타입 에러가 발생함
    },
) {
    return function(state: S = initialState, action: Extract<A, TypedAction<T>>) {
        return produce(state, draft => { // 이머를 이용해서 불변 객체를 쉽게 다룰 수 있음
            const handler = handlerMap[action.type]; // 입력된 액션에 해당하는 액션 처리 함수를 실행함
            if(handler) {
                handler(draft, action);
            }
        });
    };
}