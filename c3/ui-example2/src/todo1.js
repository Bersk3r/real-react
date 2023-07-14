import {useState} from "react";
import Title from './title1';
function Todo() {
  const [count, setCount] = useState(0);
  function onClick() {
    setCount(count + 1);
  }
  return (
    <>
      <Title title={`현재 카운트: ${count}`} />
      <button onClick={onClick}>증가</button>
    </>
  );
}
export default Todo;