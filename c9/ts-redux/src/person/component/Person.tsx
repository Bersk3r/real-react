import React from 'react';
import { ReduxState } from '../../common/store';
import { actions } from '../state/action';
import { useSelector, useDispatch } from 'react-redux';
import useTypedSelector from "../../common/useTypedSelector";

interface Props {
    birthday: string;
}

export default function Person({birthday}: Props) {
    // const name = useSelector<ReduxState, string>(state => state.person.name); // 첫 번째 제네릭 타입은 리덕스 상탯값을 의미함 -> ReduxState 타입 코드는 잠시 후 확인할 수 있음 => ReduxState 타입이 미리 입력된 훅을 만들어서 사용하면 편하게 입력할 수 있음
    const name = useTypedSelector(state => state.person.name);
    const age = useTypedSelector(state => state.person.age);
    // const age = useSelector<ReduxState, number>(state => state.person.age);
    const dispatch = useDispatch();
    function onClick() {
        dispatch(actions.setName('mike'));
        dispatch(actions.setAge(23));
    }

    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
            <p>{birthday}</p>
            <button onClick={onClick}>정보 추가하기</button>
        </div>
    );
}