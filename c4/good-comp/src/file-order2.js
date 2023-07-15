// 속성 값에 타입 정보가 없는 경우
// 코드를 자세히 보기전까지 내용을 알기 힘듦
import MyComponent from "./file-order";

function User({type, age, male, onChangeName, onChangeTitle}) {
  function onClick1() {
    const msg = `type: ${type}, age: ${age ? age: "알 수 없음"}`;
    log(msg, {color: type === "gold" ? "red": "black"});
    // ...
  }
  function onClick2() {
    if(onChangeName) {
      onChangeName(name);
    }
    onChangeTitle(title);
    male ? goMalePage() : goFemalPage();
    // ...
  }
  // ...
}

// 속성 값에 타입 정보가 있는 경우
// prop-types를 이용한 속성값의 타입 정보 정의

User.PropTypes = {
  male: PropTypes.bool.isRequired, // 필수 값임을 알 수 있음
  age: PropTypes.number, // 필수 값이 아님을 알 수 있음
  type: PropTypes.oneOf(["gold", "silver", "bronze"]), // 이 중 하나만 입력이 가능하다는 것을 알 수 있음
  onChangeName: PropTypes.func, // 함수 타입은 prop-types에서 함수의 매개변수와 반환 값에 대한 타입 정보는 정의할 수 없음, 이 경우 문서화를 위해 타입 정보를 주석으로 자세히 적기를 추천함
  onChangeTitle: PropTypes.func.isRequired,
};
function User({type, age, male, onChangeName, onChangeTitle}) {
  function onClick1() {
    const msg = `type: ${type}, age: ${age ? age: "알 수 없음"}`;
    log(msg, {color: type === "gold" ? "red": "black"});
    // ...
  }
  function onClick2() {
    if(onChangeName) {
      onChangeName(name);
    }
    onChangeTitle(title);
    male ? goMalePage() : goFemalPage();
    // ...
  }
  // ...
}

// prop-types로 정의할 수 있는 타입
MyComponent.PropTypes = {
  // 리액트 요소
  // <div>hello</div> => 참
  // <SomeComponent /> => 참
  // 123 => 거짓
  menu: PropTypes.element,

  // 컴포넌트 함수가 반환할 수 있는 모든 것
  // number, string, array, element, ...
  // <SomeComponent /> => 참
  // 123 => 거짓
  description: PropTypes.node,

  // Message 클래스로 생성된 모든 객체
  // new Messages() => 참
  // new Car() => 거짓
  message: PropTypes.instanceOf(Message),

  // 배열에 포함된 값 중에서 하나를 만족
  // 'jone' => 참
  // 'messy' => 거짓
  name: PropTypes.oneOf(["jone", "mike"]),

  // 배열에 포함된 타입 중에서 하나를 만족
  // 123 => 참
  // 'messy' => 참
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // 특정 타입만 포함하는 배열
  // [1,5,7] => 참
  // ['a','b'] => 거짓
  ages: PropTypes.arrayOf(PropTypes.number),

  // 객체의 속성값 타입을 정의
  // {color: 'red', weight: 123} => 참
  // {color: 'red', weight: '123kg'} => 거짓
  info: PropTypes.shape({
    color: PropTypes.string,
    weight: PropTypes.number,
  }),

  // 객체에서 모든 속성값의 타입이 같은 경우
  // {prop1: 123, prop2: 456} => 참
  // {prop1: 'red', prop2: 123} => 거짓
  infos: PropTypes.objectOf(PropTypes.number)
};

MyComponent.propTypes = {
  age: function(props, propName, componentName) {
    const value = props[propName];
    if(value < 10 || value > 20) { // age의 속성값 타입이 10이상이고 20이하인 숫자로 정의됨
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. It must be 10 <= value <= 20.`
      );
    }
  }
};
