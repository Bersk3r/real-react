import {useCallback, useEffect, useState} from "react";

function MyComponent(props) {
  // ...
}
function isEqual(prevProps, nextProps) {
  // true 또는 false를 반환
}

React.memo(MyComponent, isEqual); // React.memo의 두 번재 매개변수로 속성값 비교 함수를 입력함

const prevProps = {
  todos: [
    {title: 'fix bug', priority: 'high'},
    {title: 'meeting with jone', priority: 'low'}, // todos의 두 번째 객체의 priority 속성 값이 변경됨, todos를 수정 가능한 객체로 관리했다면 속성값의 변경 여부를 알 수 있는 방법은 단순 무식하게 모두 비교하는 것임, 불변 객체로 관리하면 한번만 비교하면 됨
  ],
  // ...
};
const nextProps = {
  todos: [
    {title: 'fix bug', priority: 'high'},
    {title: 'meeting with jone', priority: 'high'},
    // ...
  ],
  // ...
};

// 속성값을 불변 객체로 관리 했을 때 변경 여부 확인
prevProps.todos !== nextProps.todos

// JSX 문법을 createElement로 변경한 코드
function Parent() {
  return <Child name="mike" age={23} />;
}

function Parent() {
  return React.createElement(Child, {name: 'mike', age: 23}); // createElement
}

// 렌더링 할 때마다 새로운 함수를 만들어서 자식 컴포넌트로 전달
function Parent() {
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{`count: ${count}`}</p>
      <button onClick={() => setCount(count + 1)}>increase count</button> // 버튼을 눌러 count 상탯값이 변경되면 Parent 컴포넌트의 렌더링이 시작됨 => 이 때, SelectFruit 컴포넌트로 전달되는 속성값은 변경되지 않으므로 SelectFruit 컴포넌트에서 React.memo를 사용했다면 SelectFruit 컴포넌트 함수는 호출되지 않는다고 생각되기 쉬움.
      <SelectFruit                                                        // count 변수가 변경될 떄마다 컴포넌트 함수가 호출되며, React.memo를 사용했고, SelectFruit 컴포넌트로 전달되는 selectedFruit 값이 변경되지 않았음에도 컴포넌트 함수는 호출됨
        selected={selectedFruit}
        onChange={fruit => setSelectedFruit(fruit)} // SelectFruit 컴포넌트로 전달되는 onChange 속성값이 변하여 onChange 속성값은 부모 컴포넌트가 렌더링될 때마다 새로운 함수로 만들어짐
        />
    </div>
  );
}

// useState의 상탯값 변경 함수를 입력하여 속성값을 고정
function Parent() {
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{`count: ${count}`}</p>
      <button onClick={() => setCount(count + 1)}>increase count</button>
      <SelectFruit
        selected={selectedFruit}
        onChange={setSelectedFruit} // useState의 상탯값 변경 함수는 변하지 않으므로 onChange 속성값에는 항상 같은 값이 입력됨
      />
    </div>
  );
}

// useCallback을 사용한 속성값의 고정
function Parent() {
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [count, setCount] = useState(0);

  const onChangeFruit = useCallback(fruit => { // useCallback 훅을 이용하여 이벤트 처리 함수를 구현함
    setSelectedFruit(fruit);
    sendLog({type: "fruit change", value: fruit});
  },[]); // 의존성 배열로 빈 배열을 입력했으므로, 이 함수는 항상 고정된 값을 가짐
  // ...

  return (
    <div>
      <p>{`count: ${count}`}</p>
      <button onClick={() => setCount(count + 1)}>increase count</button>
      <SelectFruit
        selected={selectedFruit}
        onChange={setSelectedFruit} // useCallback 함수가 반환한 함수를 속성 값으로 입력함
      />
    </div>
  );
}
// 렌더링을 할 때마다 새로운 객체를 만들어서 자식 컴포넌트의 속성값으로 전달
function SelectFruit({selectedFruit, onChange}) {
  // ...
  return (
    <div>
      <Select
        options={[ // SelectFruit 컴포넌트가 렌더링 될 때마다 options 속성값으로 새로운 객체가 입력됨, 이는 렌더링과 무관한 같은 값을 가지므로 컴포넌트 밖의 상수로 관리하면 됨
          {name: "apple", price: 500},
          {name: "banana", price: 1000},
          {name: "orange", price: 1500},
        ]}
        selected={selectedFruit}
        onChange={onChange}
        />
      {/* ... */}
    </div>
  );
}

// 변하지 않는 값을 상수 변수로 관리하기
function SelectFruit({selectedFruit, onChange}) {
  // ...
  return (
    <div>
      <Select
        options={FRUITS} // 렌더링과 관련없이 같은 값을 가짐, 다른 상탯값이나 속성값을 이용하여 계산되는 값은 상수 변수로 관리할 수 없음
        selected={selectedFruit}
        onChange={onChange}
      />
      {/* ... */}
    </div>
  );
}

const FRUITS = [ // 과일 목록을 컴포넌트 밖 상수 변수로 관리
  {name: "apple", price: 500},
  {name: "banana", price: 1000},
  {name: "orange", price: 1500},
];

// 상탯값을 이용하여 속성값을 계산
function SelectFruit({selectedFruit, onChange}) {
  const [maxPrice, setMaxPrice] = useState(1000); // maxPrice 상탯값은 화면에 보여 줄 과일의 최대 가격을 의미함
  // ...
  return (
    <div>
      <Select
        options={FRUITS.filter(item => item.price <= maxPrice)} // 상탯값 maxPrice를 이용하여 속성값 options를 계산함
        selected={selectedFruit}
        onChange={onChange}
      />
      {/* ... */}
    </div>
  );
}

const FRUITS = [ // 과일 목록을 컴포넌트 밖 상수 변수로 관리
  {name: "apple", price: 500},
  {name: "banana", price: 1000},
  {name: "orange", price: 1500},
];

// useMemo 훅을 이용하여 속성값을 계산
function SelectFruit({selectedFruit, onChange}) {
  const [maxPrice, setMaxPrice] = useState(1000);
  const fruits = useMemo(() => FRUITS.filter(item => item.price >= maxPrice), [maxPrice]); // maxPrice 값이 같으면 fruits의 값은 변하지 않음
  // ...
  return (
    <div>
      <Select
        options={fruits}
        selected={selectedFruit}
        onChange={onChange}
      />
      {/* ... */}
    </div>
  );
}

const FRUITS = [
  {name: "apple", price: 500},
  {name: "banana", price: 1000},
  {name: "orange", price: 1500},
];

// 상탯값을 변경하면서 객체를 새로 생성하지 않은 경우
function SelectFruit({selectedFruit, onChange}) {
  const [fruits, setFruits] = useState(["apple", "banana", "orange"]); // 과일 목록을 상탯값으로 관리
  const [newFruit, setNewFruit] = useState(""); // 사용자는 키보드를 입력하여 새로운 과일 이름을 newFruit에 저장

  function addNewFruit() {
    fruits.push(newFruit); // 새로운 과일을 과일 목록에 추가함, fruits의 상탯값의 내용은 변경되나 fruits 변수가 가리키는 배열의 참조값은 변하지 않음
    setNewFruit(""); // newFruit 상탯값을 초기화하면서 다시 렌더링이 진행됨
  }

  // ...

  return (
    <div>
      <Select // Select 컴포넌트의 입장에서 속성 값이 변하지 않았음 (Select 컴포넌트가 React.memo를 사용했다면 새로 추가된 과일은 내용에 반영되지 않음)
        options={fruits}
        selected={selectedFruit}
        onChange={onChange}
      />
      <input
        type="text"
        value={newFruit}
        onChange={e => setNewFruit(e.target.value)}
        />
      <button onClick={addNewFruit}>추가하기</button>
      {/* ... */}
    </div>
  );
}

// 상탯값을 불변 객체로 관리하기
function addNewFruit() {
  setFruits([...fruits, newFruit]);
  setNewFruit("");
}

// 요소의 타입을 변경하는 코드
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  if(flag) { // 최상위 요소의 타입이 1초마다 div나 span으로 바뀜
    return (
      <div>
        <Counter />
        <p>사과</p>
        <p>바나나</p>
      </div>
    );
  } else {
    return (
      <span>
        <Counter />
        <p>사과</p>
        <p>바나나</p>
      </span>
    );
  }
}

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(prev => prev + 1), 1000);
  });
  return <p>count: {count}</p>;
}

// 요소의 속성값을 변경하는 경우
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  return (
    <div
      className={flag ? 'yes':'no'} // 요소의 속성 값을 변경하면 해당 속성만 실제 돔에 반영됨
      style={{color: 'black', backgroundColor: flag ? 'green':'red'}} // style 속성에서 변경된 부분만 실제 돔에 반영함 => color 속성은 그대로 두고, backgroundColor 속성만 실제 돔에 반영됨
    >
      <Counter />
      <p>사과</p>
      <p>바나나</p>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(prev => prev + 1), 1000);
  });
  return <p>count: {count}</p>;
}
// 새로운 요소를 추가하거나 삭제하는 경우
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  if(flag) { // 최상위 요소의 타입이 1초마다 div나 span으로 바뀜
    return (
      <div>
        <p>사과</p>
        <p>바나나</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>사과</p>
        <p>바나나</p>
        <p>파인애플</p> // 1초마다 파일애플을 추가하거나 삭제함 => 가상 돔 비교를 통해 변경 점이 없다는 것을 알아, 실제 돔에서 파인애플만 추가/삭제함
      </div>
    );
  }
}

// 1초마다 중간에 요소를 추가하고 삭제
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  if(flag) { // 최상위 요소의 타입이 1초마다 div나 span으로 바뀜
    return (
      <div>
        <p>사과</p>
        <p>바나나</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>사과</p>
        <p>파인애플</p> // 리액트는 중간에 요소를 추가하면 그 뒤에 있는 요소가 변경되지 않았다는 것을 알지 못함
        <p>바나나</p>
      </div>
    );
  }
}

// key 속성 값을 이용하는 경우
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  if(flag) { // 최상위 요소의 타입이 1초마다 div나 span으로 바뀜
    return (
      <div>
        <p key="apple">사과</p>
        <p key="banana">바나나</p>
      </div>
    );
  } else {
    return (
      <div>
        <p key="apple">사과</p>
        <p key="pineapple">파인애플</p>
        <p key="banana">바나나</p>
      </div>
    );
  }
}

// key 속성값으로 배열의 순서 정보를 입력
function App() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag(prev => !prev), 1000);
  });
  const fruits = flag ? FRUITS_1 : FRUITS_2;
  return (
    <div>
      {fruits.map((item, index) => (
        <p key={index}>{item}</p> // key 속성값으로 배열의 순서 정보를 입력함, 사과 요소를 제외한 나머지 요소가 1초마다 실제 돔에 반영됨 => 바나나는 요소가 변경되지 않았으나 순서가 변경되었기 때문
      ))}
    </div>
  );
}
const FRUIT_1 = ['사과', '바나나'];
const FRUIT_2 = ['사과', '파인애플', '바나나'];