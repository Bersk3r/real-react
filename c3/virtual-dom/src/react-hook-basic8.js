import React, {useState, useRef, useEffect, useCallback, useId, useDeferredValue, useDebugValue} from "react";

// Consumer 컴포넌트 없이 콘텍스트 사용하기

// useContext를 사용하지 않고, 콘텍스트 API 사용하기
const UserContext = React.createContext();
const user = { name: 'mike', age: 23 };

function ParentComponent() {
    return (
      <UserContext.Provider value={user}> // 부모 컴포넌트를 통해서 데이터를 전달함
        <ChildComponent />
      </UserContext.Provider>
    );
}

function ChildComponent() { // 자식 컴포넌트에서는 Consumer 컴포넌트를 통해서 데이터를 사용함
  // ... (해당 영역에서 콘텍스트 데이터를 사용하기에는 복잡한 방법을 사용해야 함)
  const user = useContext(UserContext);
  console.log(`user: ${user.name}, ${user.age}`);
  return (
    <div>
      <UserContext.Consumer>
        {user => (
            <>
              <p>{`name is ${user.name}`}</p>
              <p>{`age is ${user.age}`}</p>
            </>
        )}
      </UserContext.Consumer>
    </div>
  )
}

// useRef 훅
function Profile() {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20); // age의 이전 값을 저장하기 위해 useRef를 사용
  useEffect(
    () => { // age 값이 변경되면 그 값을 prevAgeRef에 저장
      prevAgeRef.current = age;
    }, [age]);
  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger'; // age의 이전 상탯값을 이용
  return (
    <div>
      <p>{`age ${age} is ${text} than age ${prevAge}`}</p>
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 + 1);
          setAge(age); // age가 변경되어서 렌더링할 때 text의 prevAge는 age의 이전 상탯값을 나타냄, 렌더링이 끝나면 prevAgeRef는 age의 최신 상탯값을 변경됨
        }}
      >
        나이 변경
      </button>
    </div>
  );
}

// useMemo 훅
import React, {useMemo} from 'react';
import { runExpensiveJob } from './util';

function MyComponent({v1, v2}) {
  const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);
  return <p>{`value is ${value}`}</p>;
}


// useCallback 훅
import React, {useState} from 'react';
import { saveToServer } from './api';
import UserEdit from './UserEdit';


// useCallback을 사용하지 않은 경우
function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit
        onSave={() => saveToServer(name, age)} // Profile 컴포넌트가 렌더링 될 때마다 UserEdit 컴포넌트의 onSave 속성 값으로 새로운 함수가 입력됨, UserEdit 컴포넌트에서 React.memo를 사용해도 onSave 속성 값은 항상 변경되므로 불필요한 렌더링이 발생함
        // onSave 속성 값은 name이나 age가 변경되지 않으면 항상 같아야 함
        setName={setName}
        setAge={setAge}
      />
    </div>
  );
}

// useCallback을 사용한 경우
function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const onSave = useCallback(() => saveToServer(name, age), [name, age]); // 이전에 onSave의 속성 값으로 전달했던 과 같은 함수를 useCallback 훅의 첫 번째 매개변수로 전달함

  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit onSave={onSave} setName={setName} setAge={setAge}/>
    </div>
  );
}

// useReducer 훅
import React, {useReducer} from "react";

const INITIAL_STATE = {name: 'empty', age: 0};
function reducer(state, action) { // 리덕스의 리듀서와 동일한 방식의 함수
  switch(action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}

function Profile() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE); // useReducer 훅의 매개변수로 앞에서 작성한 리듀서와 초기 상탯값을 입력함, useReducer 훅은 상탯값과 dispatch 함수를 차례대로 반환함
    return (
      <div>
        <p>{`name is ${state.name}`}</p>
        <p>{`age is ${state.age}`}</p>
        <input
          type="text"
          value={state.name}
          onChange={ e => dispatch({type: 'setName', name:e.currentTarget.value })} // 리덕스의 dispatch 함수처럼 사용함
        />
        <input
          type="text"
          value={state.age}
          onChange={ e => dispatch({type: 'setAge', age:e.currentTarget.value })}
        />
      </div>
    );
}

// useReducer와 콘텍스트 API를 화룡한 이벤트 처리 함수 전달
import React, {useReducer} from "react";

const INITIAL_STATE = {name: 'empty', age: 0};
function reducer(state, action) { // 리덕스의 리듀서와 동일한 방식의 함수
  switch(action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}

export const ProfileDispatch = React.createContext(null); // dispatch 함수를 전달해주는 콘텍스트 객체 생성

function Profile() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <ProfileDispatch.Provider value={dispatch}> // Provider를 통해 dispatch 함수를 데이터로 전달, SomeComponent 하위에 있는 모든 컴포넌트에서는 콘텍스트를 통해 dispatch 함수를 호출할 수 있음
        <SomeComponent />
      </ProfileDispatch.Provider>
    </div>
  );
}

// useImperativeHandle 훅

import React, { forwardRef, useState, useImperativeHandle } from "react";

function Profile(props, ref) { // ref 객체는 두 번째 매개변수로 넘어옴
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  useImperativeHandle(ref, () => ({ // useImperativeHandle 훅으로 ref 객체와 부모 컴포넌트에서 접근 가능한 여러 함수를 입력함
    addAge: value => setAge(age + value),
    getNameLength: () => name.length,
  }));

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      {/* ... */}
    </div>
  );
}

export default forwardRef(Profile); // 부모 컴포넌트에서 입력한 ref 객체를 직접 처리하기 위해 forwardRef 함수를 호출함

function Parent() {
  const profileRef = useRef();
  const onClick = () => {
    if(profileRef.current) {
      console.log('current name length: ', // Profile 컴포넌트에서 구현한 함수를 호출함
        profileRef.current.getNameLength());
      profileRef.current.addAge(5);
    }
  };
  return (
    <div>
      <Profile ref={profileRef} /> // Profile 컴포넌트의 속성 값으로 ref 객체를 전달
      <button onClick={onClick}>add age 5</button>
    </div>
  );
}

// useDebugValue 훅
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onToggle = () => setValue(!value);
  useDebugValue(value ? 'on': 'off'); // 디버깅 시 확인할 값을 useDebugValue 훅의 매개변수로 입력 => 해당 값은 리액트 개발자 도구에서 확인 가능
  return [value, onToggle];
}
