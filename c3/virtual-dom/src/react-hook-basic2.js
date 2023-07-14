import React, { useState } from "react";
function Profile() {
  const [state, setState] = useState({ name: '', age: 0}); // 두 상탯값을 하나의 객체로 관리
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value})} // useState 훅은 이전 상탯값을 덮어쓰므로 전개 연산자가 필요함 => 상탯값을 하나의 객체로 관리하는 경우 useReducer 훅을 사용하는 게 좋음
       />
       <input
          type="number"
          value={state.age}
          onChange={e => setState({ ...state, name: e.target.value})}
        />
    </div>
  );
}

function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function onClick() {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    }
    window.addEventListener("click", onClick); // 윈도우 객체에 이벤트 처리 함수를 등록 => 리액트 요소에 등록되지 않는 이벤트 처리 함수는 리액트 내부에서 관리되지 않음, 리액트 외부에 등록된 이벤트 처리 함수에 관해 상탯값 변경 함수를 호출하면 배치로 처리하지 않음
    return () =>  window.removeEventListener("click", onClick);
  }, []);
  console.log('render called'); // 화면 클릭 시, 두 번 출력됨
  // ...
}

function onClick() {
  ReactDOM.unstable_batchedUpdates(() => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  });
}