import {useState} from "react";
import Title from './title2';
function Todo() {
  const [count, setCount] = useState(0);
  // const [count, setCount] = useState({value: 0});
  function onClick() {
    setCount(count + 1);
    // count.value = 2;
    // setCount(count);
  }
  return (
    <>
      {/*<Title title={`현재 카운트: ${count.value}`} />*/}
      <Title title={`현재 카운트: ${count}`} />
      <button onClick={onClick}>증가</button>
    </>
  );
}
export default Todo;