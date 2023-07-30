export default function mergeReducers(reducers) {
  return function(state, action) { // mergeReducers 함수는 리듀서를 반환함
    if(!state) {
      return reducers.reduce((acc,r) => ({...acc, ...r(state, action)}), {}); // 초기 상탯값을 계산할 때는 모든 리듀서 함수의 결괏값을 합침
    } else {
      let nextState = state; // 초기화 단계가 아니라면, 입력된 모든 리듀서를 호출하여 다음 상탯값을 반환함
      for (const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  };
}