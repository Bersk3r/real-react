import { createAction } from '../../common/redux';

export enum ActionType { // enum으로 액션 타입을 정의함
    SetName = 'person_setName',
    SetAge = 'person_setAge',
}

export const actions = {
    setName: (name: string) => createAction(ActionType.SetName, { name }), // createAction 함수를 이요하여 액션 생성자 함수를 정의함
    setAge: (age: number) => createAction(ActionType.SetAge, { age }),
};