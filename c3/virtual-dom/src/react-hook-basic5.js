import React, { useState, useEffect } from "react";

// 하나의 컴포넌트에서 훅을 호출하는 순서가 다른 경우
function MyComponent() {
  const [value, setValue] = useState(0);
  if(value === 0) {
    const [v1, setV1] = useState(0);
  } else {
    const [v1, setV1] = useState(0);
    const [v2, setV2] = useState(0);
  }
  // ...
  for(let i=0; i < value; i++) {
    const [num, setNum] = useState(0);
  }
  // ...
  function func1() {
    const [num, setNum] = useState(0);
  }
  // ...
}


// 훅의 호출 순서가 중요한 이유
// 현재 useState 훅에 전달된 정보는 상탯값의 기본 값임
// 리액트가 상탯값을 구분할 수 있는 유일한 정보는 훅이 사용된 순서임
function Profile() {
  const [age, setAge] = useState(0);
  const [name, setName] = useState('');
  // ...
  useEffect(() => {
    // ...
    setAge(23);
  }, []);
  // ...
}

// 리액트 내부 훅 처리 방식
let hooks = null;

export function useHook() {
  // ...
  hooks.push(hookData);
}

function process_a_component_rendering(component) {
  hooks = [];
  component();
  let hooksForThisComponent = hooks;
  hooks = null;
  // ...
}
