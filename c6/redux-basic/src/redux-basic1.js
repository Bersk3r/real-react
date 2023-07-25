/**상탯값은 오직 액션 객체에 의해서만 변경됨*/
const incrementAction = {
  type: 'INCREMENT', // 액션 객체는 type 속성값이 존재해야 함, type 속성 값으로 액션 객체를 구분함
  amount: 123, // type 속성값을 제외한 나머지는 상탯값을 수정하기 위해 사용되는 정보임
};
const conditionalIncrementAction = {
  type: 'CONDITIONAL_INCREMENT',
  amount: 2,
  gt: 10,
  lt: 100,
};
store.dispatch(incrementAction);
store.dispatch(conditionalIncrementAction);

/**시간 함수를 사용하면 순수 함수가 아님*/
// 홍길동님 안녕하세요. 지금은 11시 30분입니다. => 두 함수에서 반환하는 문자열
sayHello1('홍길동'); // 해당 함수는 내부적으로 시간 함수를 호출하므로, 순수 함수가 아님 => 같은 인수를 입력해도 호출하는 시점에 따라 다른 값을 반환하기 때문임
sayHello2('홍길동', '11:30'); // sayHello2 함수는 순수 함수임 => 같은 인수를 입력하면 항상 같은 값을 반환함

/**순수 함수는 테스트 코드를 작성하기 쉽다*/
const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
expect(sayHello1('홍길동')).toBe( // sayHello1 함수는 내부적으로 현재 시각을 사용하기 때문에 테스트 코드에서도 현재 시각을 가져와야 함 => 하지만 현재 시각을 가져오는 시점이 서로 다르기 떄문에 간헐적으로 테스트가 실패할 수 있음
  `홍길동님 안녕하세요. 지금은 ${hour}시 ${minute}분입니다.`, // 일정 수전의 오차는 허용하도록 테스트 코드 작성이 가능하나 번거로움
);

expect(sayHello2('홍길동', '11:30')).toBe( // 순수 함수로 작성한 코드는 별다른 고민없이 쉽게 테스트 코드를 작성할 수 있음
  '홍길동님 안녕하세요. 지금은 11시 30분입니다.',
);