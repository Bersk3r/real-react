/**shallowEqual 함수 애용하기*/

import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function MyComponent() {
  const [value1, value2, value3 ] = useSelector(
    state => [state.value1, state.value2, state.value3 ], // 여러 개의 상탯값을 배열에 담아서 반환함
    shallowEqual, // useSelect 훅의 두 번째 매개변수에 shallowEqual 함수를 입력하면 배열의 각 원소가 변경되었는지 검사함 => 원한다면 반환값으로 배열뿐만이 아닌 객체도 사용가능함
  )
}

/**항상 shallowEqual 함수를 이용하는 커스텀 훅*/
function useMySelector(selector) {
  return useSelector(selector, shallowEqual); // 항상 shallowEqual 함수를 입력함
}

function MyComponent() {
  const [value1, value2] = useMySelector(state => [state.value1, state.value2]);
  const value3 = useMySelector(state => state.value3); // 해당 방법은 상탯값을 하나만 반환하는 경우에는 비효율적으로 동작할 수 있음
  const [value4] = useMySelector(state => [state.value4]); // 위 구문으로 인해 성능이 걱정되면 상탯값이 하나여도 배열로 감싸면 됨
}