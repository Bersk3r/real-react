import createReducer from "./createReducer";

export default function createItemsLogic(name) { // 배열의 고유한 이름을 매개변수로 받음
  const ADD = `${name}/ADD`; // 입력 받은 이름을 이용해서 액션 타입을 만듦
  const REMOVE = `${name}/REMOVE`;
  const EDIT = `${name}/EDIT`;

  const add = item => ({ type: ADD, item }); // 액션 생성자 함수를 만듦
  const remove = item => ({ type: REMOVE, item });
  const edit = item => ({ type: EDIT, item });

  const reducer = createReducer(
    {name: []}, //  초기 상탯값으로 빈 배열을 넣음
  {
    [ADD] : (state, action) => state[name].push(action.item), // ADD와 EDIT를 처리하는 리듀서 코드의 로직은 이전에 작성한 코드와 같음
    [REMOVE]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      state[name].splice(index,1);
    },
    [EDIT]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      if(index >= 0) {
        state[name][index] = action.item;
      }
    },
  },
  );
  return  { add, remove, edit, reducer }; // 액션 생성자 함수와 리듀서를 내보냄
}

/**상탯값이 의도한 대로 변경되지 않는 코드*/
// [REMOVE]: (state, action) => {
//   state = state.filter(item => item.id !== action.item.id); // 순간적으로 매개변수의 값만 변경될 뿐임
// }

/**매개변수 값만 변경되는 예*/
function myFunc(a) {
  a = 20; // 매개변수의 값만 변경되고, 인수로 사용된 변수 v는 변하지 않음, 자바스크립트에서 함수의 호출은 값에 의한 호출(call by value)이기 때문임
}
let v = 10;
myFunc(v);
console.log(v);
