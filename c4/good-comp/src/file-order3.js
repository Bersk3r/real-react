// 조건부 렌더링 예시 1
function GreetingA({isLogin, name}) {
  if(isLogin) {
    return <p>{`${name}님 안녕하세요.`}</p>;
  } else {
    return <p>권한이 없습니다.</p>;
  }
}
function GreetingB({isLogin, name}) { // GreeingB 컴포넌트가 코드 길이도 짧고, p 태그도 한번만 등장함
  return <p>{isLogin ? `${name}님 안녕하세요.` : `권한이 없습니다.`}</p>
}

// 조건부 렌더링 예시 2 (조금 복잡해진 경우) => 여기에 대해서 어떤 게 좋다라는 건 답이 없으나 상황에 따라 어떤 것이 더 낫다는 존재함-
function GreetingA({isLogin, name}) {
  if(isLogin) {
    return (
      <p className="greeting" onClick={showMenu}>
        {`${name}님 안녕하세요.`}
      </p>
    );
  } else {
    return (
      <p className="noAuth" onClick={goToLoginPage}>
        권한이 없습니다.
      </p>
    );
  }
}
function GreetingB({isLogin, name}) {
  return (
    <p
      className={{isLogin > 'greeting' : 'noAuth'}}
      onClick={isLogin ? showMenu : goToLoginPage}
      >
      {isLogin ? `${name}님 안녕하세요.` : `권한이 없습니다.`}
    </p>
  );
}

// 삼항 연산자를 활용한 조건부 렌더링 (위 조건에선 삼항 연산자보다 && 연산자를 사용하는 게 더 나음)
function Greeting({isLogin, name, cash}) {
  return (
    <div>
      저희 사이트에 방문해 주셔서 감사합니다.
      {isLogin ? (
        <div>
          <p>{name}님 안녕하세요.</p>
          <p>현재 보유하신 금액은 {cash}원입니다.</p>
        </div>
      ) : null}
    </div>
  );
}

// &&, || 연산자 이해하기
const v1 = 'ab' && 0 && 2; // v1 === 0
const v2 = 'ab' && 2 && 3; // v2 === 3
const v3 = 'ab' || 0; // v3 === 'ab'
const v4 = '' || 0 || 3; // v4 === 3

// && 연산자를 사용한 조건부 렌더링
function Greeting({isLogin, name, cash}) {
  return (
    <div>
      저희 사이트에 방문해주셔서 감사합니다.
      {isLogin && (
        <div>
          <p>{name}님 안녕하세요.</p>
          <p>현재 보유하신 금액은 {cash}원입니다.</p>
        </div>
      )}
    </div>
  );
}

function Greeting({isEvent, isLogin, name, cash}) {
  return (
    <div>
      저희 사이트에 방문해 주셔서 감사합니다.
      {isEvent ? ( // 삼항 연산자가 어디에서 끝나는지 확인하기 어려움
        <div>
          <p>오늘의 이벤트를 놓치지 마세요.</p>
          <button onClick={onClickEvent}>이벤트 참여하기</button>
        </div>
        ) : isLogin ? (
        cash <= 100000 ? (
          <div>
            <p>{name}님 안녕하세요.</p>
            <p>현재 보유하신 금액은 {cash}원입니다.</p>
          </div>
        ) :null
      ) : null}
    </div>
  );
}

function Greeting({isEvent, isLogin, name, cash}) {
  return (
    <div>
        저희 사이트에 방문해 주셔서 감사합니다.
        {isEvent && ( // 각 그룹의 조건이나 두 그룹이라는 것도 금방 확인이 가능함
        <div>
          <p>오늘의 이벤트를 놓치지 마세요.</p>
          <button onClick={onClickEvent}>이벤트 참여하기</button>
        </div>
        )}
        {!isEvent &&
        isLogin &&
        cash <= 100000 && (
          <div>
            <p>{name}님 안녕하세요.</p>
            <p>현재 보유하신 금액은 {cash}원입니다.</p>
          </div>
        )}
    </div>
  );
}

// && 연산자를 잘못 사용한 예
<div>
  {cash && <p>{cash}원 보유 중</p>} // 0원일 때에도 0원 보유중을 출력하지 않음, 의도치 않게 0만 덩그러니 출력됨 => 마지막 검사 값이 0이므로, 의도적으로 0도 거짓으로 처리하는 경우 !!cash &&를 사용하는 게 좋음
  {memo && <p>{200 - memo.length}자 입력 가능</p>} // 빈 문자열일 때, 200자 입력 가능이 아닌 0이 덩그러니 출력됨 => 이 경우엔 명확히 undefined, null이 아닌 경우로 표현해야 함
</div>

// && 연산자를 잘 사용한 예
<div>
  {cash != null && <p>{cash}원 보유 중</p>} // 이는 null이거나 undefined가 아니면 참이 됨
  {memo != null && <p>{200 - memo.length}자 입력 가능</p>}
</div>

// 배열의 기본 값이 빈 배열이 아닌 경우
<div>{students && students.map(/* */)}</div> // 변수가 undefined나 null을 가질 수 있다면 컴포넌트 함수에서 변수를 사용할 때마다 students && 코드를 작성해야 함
<div>{products.map(/* */)}</div> // 배열의 기본 값으로 빈 배열로 설정하면 코드가 간결해짐

// 속성값으로부터 새로운 상탯값을 만드는 예
//
function MyComponent({todos}) {
  const [doneList, setDoneList] = useState(todos.filter(item => item.done)); // 부모로부터 받은 todos로부터 완료 목록 doneList를 만들음
  // 개선 방안 : doneList는 useMemo로 생성
  function onChangeName(key, name) { /// onChangeName 함수를 부모로부터 속성값으로 받을 것
    setDoneList(
      doneList.map(item => (item.key === key ? {...item, name} : item)), // 이벤트 처리 함수에서 특정 목록의 이름을 수정하고 있음
    );
  }
  // ...
}