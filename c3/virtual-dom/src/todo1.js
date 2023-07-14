import {useState} from "react";

function Todo({title, desc}) {
  const [priority, setPriority] = useState('high');
  function onClick() {
    setPriority(priority === "high" ? "low" : "high");
  }
  return (
    <div>
      <Title title={title} />
      <p>{desc}</p>
      <p>{priority === 'high' ? '우선순위 높음':'우선순위 낮음'}</p>
      <button onClick={onClick}>우선순위 변경</button>
    </div>
  );
}

const Title = React.memo(({title}) => {
  return <p style={{ color: 'blue'}}>{title}</p>;
});

ReactDOM.render(<Todo title="리액트 공부하기" desc={"실제 리액트 프로그래밍을 열심히 읽는다"} />, document.getElementById('root'),);

// render의 첫 번째 요소
const initialElementTree = {
  type: Todo,
  props: {
    title: "리액트 공부하기",
    desc: "실전 리액트 프로그래밍을 열심히 읽는다",
  },
  // ...
}

// 리액트는 컴포넌트에 대한 렌더링 결과를 얻기 위해 컴포넌트 함수를 호출함
// Todo 컴포넌트 렌더링 결과
const elementTree = {
  type: 'div', // 트리의 루트는 div 태그가 됨
  props: {
    children: [
      {
        type: Title, // Title 컴포넌트가 아직 존재하므로 이 트리를 실제 돔으로 만들 수 없음
        props: { title: '리액트 공부하기'},
      },
      {
        type: 'p',
        props: { children: '실전 리액트 프로그래밍을 열심히 읽는다'},
        // ...
      },
      {
        type: 'p',
        props: { children: '우선순위 높음'},
        // ...
      },
      {
        type: 'button',
        props: {
          onClick: function() {
            // Todo 컴포넌트의 onClick 함수
          },
          children: '우선 순위 변경',
        },
        // ...
      },
    ],
  },
  // ...
};

// Title 컴포넌트 렌더링 결과
const elementTree = {
  type: 'div',
  props: {
    children: [
      {
        type: 'p', // Title 컴포넌트로 표현했던 리액트 요소가 p 태그로 변경됨, 모든 리액트 요소의 type 속성 값이 문자열이므로 실제 돔을 만들 수 있음
        props: {
          style: {color : 'blue'},
          children: '리액트 공부하기',
        },
        // ...
      },
      {
        type: 'p',
        props: { children: '실전 리액트 프로그래밍을 열심히 읽는다'},
        // ...
      },
      {
        type: 'p',
        props: { children: '우선순위 높음'},
        // ...
      },
      {
        type: 'button',
        props: {
          onClick: function() {
            // Todo 컴포넌트의 onClick 함수
          },
          children: '우선 순위 변경',
        },
        // ...
      },
    ],
  },
  // ...
};

// setPriority 함수 호출 후 만들어진 리액트 요소 트리
// const elementTree = {
//   type: 'div',
//   props: {
//     children: [
//       {
//         type: Title, // Title 컴포넌트는 React.memo로 만들어졌고, 속성 값이 변경되지 않아 이전 결과가 재사용됨 (두 번째 가상 돔 생성)
//         props: {
//           title: '리액트 공부하기',
//         },
//         // ...
//       },
//       {
//         type: 'p',
//         props: { children: '실전 리액트 프로그래밍을 열심히 읽는다'},
//         // ...
//       },
//       {
//         type: 'p',
//         props: { children: '우선순위 높음'}, // 실제 돔에서도 해당 부분만 변경됨
//         // ...
//       },
//       // 아래 코드는 동일