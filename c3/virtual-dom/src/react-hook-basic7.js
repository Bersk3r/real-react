import React, { useState, useRef, useEffect, useCallback } from "react";

// function TextInput() {
//   const inputRef = useRef();
//
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);
//
//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button>저장</button>
//     </div>
//   );
// }
//
// // 함수형 컴포넌트에서 ref 속성을 사용한 예
// function TextInput({inputRef}) { // inputRef 속성 값을 input 요소의 ref의 속성 값으로 넣고 있음
//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button>저장</button>
//     </div>
//   );
// }
//
// function Form() {
//   const inputRef = useRef();
//   useEffect(() => {
//     inputRef.current.focus();
//   },[]);
//   return (
//     <div>
//       <TextInput inputRef={inputRef} /> // 부모 컴포넌트 입장에선 손자 요소에 ref 속성 값을 넣는 형태가 됨 => 이 방법은 자식 컴포넌트의 내부 구조를 외부에서 알야하므로 좋은 방법은 아님 (꼭 필요한 경우에만 사용 추천)
//       <button onClick={ () => inputRef.current.focus()}>텍스트로 이동</button>
//     </div>
//   );
// }
//
// // forwardRef 함수로 ref 속성 값을 직접 처리하기
// const TextInput = React.forwardRef( (props, ref) => { // forwardRef 함수를 이용하면 부모 컴포넌트에서 넘어온 ref 속성 값을 직접 처리할 수 있음
//     <div>
//       <input type="text" ref={ref} />
//       <button>저장</button>
//     </div>
// });
//
// function Form() {
//   const inputRef = useRef();
//   useEffect(() => {
//     inputRef.current.focus();
//   },[]);
//   return (
//     <div>
//       <TextInput ref={inputRef} /> // 리액트의 예약어인 ref로 사용가능해짐
//       <button onClick={ () => inputRef.current.focus()}>텍스트로 이동</button>
//     </div>
//   );
// }

// ref 속성 값으로 함수를 사용한 예
// function Form() {
//   const [text, setText] = useState(INITIAL_TEXT);
//   const [showText, setShowText] = useState(true);
//   return (
//     <div>
//       {showText && (
//         <input
//           type="text"
//           ref={ref => ref && setText(INITIAL_TEXT)} // 생성될 때만 INITIAL_TEXT을 입력하도록 함, input 요소에 아무리 입력해도 값이 그대로임 => 컴포넌트가 렌더링될 때마다 새로운 함수를 ref 속성 값으로 넣기 때문
//           value={text}
//           onChange={e => setText(e.target.value)}
//         />
//       )}
//       <button onClick={() => setShowText(!showText)}> // 버튼을 누를 때마다 input 요소가 제거되거나 생성됨
//         보이기/가리기
//       </button>
//     </div>
//   );
// }
// const INITIAL_TEXT = "안녕하세요";

// function Form() {
//   const [text, setText] = useState(INITIAL_TEXT);
//   const [showText, setShowText] = useState(true);
//
//   const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT),[]); // useCallback 훅을 사용하면 렌더링할 때마다 ㅎ마수가 변경되는 것을 막을 수 있음
//   return (
//     <div>
//       {showText && (
//         <input
//           type="text"
//           ref={setInitialText} // ref 속성 값에 새로운 함수가 입력되지 않으므로, input 요소가 생성되거나 제거될 때만 함수가 호출됨
//           value={text}
//           onChange={e => setText(e.target.value)}
//         />
//       )}
//       <button onClick={() => setShowText(!showText)}> // 버튼을 누를 때마다 input 요소가 제거되거나 생성됨
//         보이기/가리기
//       </button>
//     </div>
//   );
// }
// const INITIAL_TEXT = "안녕하세요";

// 컴포넌트가 생성된 이후 ref 객체에 current 속성이 없는 경우
function Form() {
  const inputRef = useRef();
  const [showText, setShowText] = useState(true);

  return (
    <div>
      {showText && <input type="text" ref={inputRef} />} // ref 속성 값을 입력한 input 요소는 상탯값에 따라 존재하지 않을 수도 있음, input 요소가 존재하지 않는 상태에서 버튼을 누르면 inputRef 객체의 current 속성은 존재하지 않으므로 에러가 발생함
      <button onClick={() => setShowText(!showText)}>텍스트 보이기/가리기</button>
      {/*<button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>*/}
      <button onClick={() => inputRef.current && inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
}

export default Form;
