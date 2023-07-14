function MyComponent() {
  const [count, setCount] = useState({value: 0});
  function onClick() {
    setCount({value: count.value + 1}); // 값은 두 번 증가되지 않고 한번만 증가됨 => 상탯값 변경 함수가 비동기로 동작하므로
    setCount({value: count.value + 1});
  }
  console.log('render called');
  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}

function MyComponent() {
  const [count, setCount] = useState(0);
  function onClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }
  console.log('render called');
  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}

function MyComponent() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  function onClick() {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }
  const result = count1 >= count2;
  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}