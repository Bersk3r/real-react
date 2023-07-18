// 부수 효과 함수를 async/await로 만들 때
import {useCallback, useEffect, useReducer} from "react";

useEffect(async() => {
    const data = await fetchUser(userId);
    setUser(data);
}, [userId]);

useEffect(() => {
  async function fetchAndSetUser() { // 부수 효과 함수 내 async 함수 생성
    const data = await fetchUser(userId); // await로 함수 바로 호출
    setUser(data);
  }
  fetchAndSetUser();
}, [userId]);

// fetchAndSetUser 함수 재사용
// useEffect 훅 밖에서 fetchAndSetUser 함수가 필요한 경우
function Profile({userId}) {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchAndSetUser(needDetail) { // 더보기  버튼을 누르면 상세 정보를 보여주는 기능 추가
      const data = await fetchUser(userId, needDetail);
      setUser(data);
    }
    fetchAndSetUser(false);
  },[userId]);

  if(!user) {
    return <h1>로딩...</h1>
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{`캐시: ${user.cash}`}</p>
      <p>{`계정 생성일: ${user.createAt}`}</p>
      <button onClick={() => fetchAndSetUser(true)}>더보기</button> // fetchUser 함수에 상세 정보가 필요한지 알려주는 needDetail 매개변수를 추가
      <UserDetail user={user} />
    </div>
  );
}

// fetchAndSetUser 함수를 useEffect 훅 밖으로 이동
function Profile({userId}) {
  const [user, setUser] = useState();
  async function fetchAndSetUser(needDetail) { // 더보기  버튼을 누르면 상세 정보를 보여주느 기능 추가
    const data = await fetchUser(userId, needDetail);
    setUser(data);
  }
  useEffect(() => {
    fetchAndSetUser(false);
  },[fetchAndSetUser]); // 훅 내부에서 fetchAndSetUser 함수를 사용하므로 해당 함수를 의존성 배열에 추가함

  if(!user) {
    return <h1>로딩...</h1>
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{`캐시: ${user.cash}`}</p>
      <p>{`계정 생성일: ${user.createAt}`}</p>
      <button onClick={() => fetchAndSetUser(true)}>더보기</button> // fetchUser 함수에 상세 정보가 필요한지 알려주는 needDetail 매개변수를 추가
      <UserDetail user={user} />
    </div>
  );
}
// userId가 변경될 떄에만 fetchAndSetUser 함수를 호출하도록 변경
function Profile({userId}) {
  const [user, setUser] = useState();
  const fetchAndSetUser = useCallback( // useCallback을 이용하여 fetchAndSetUser 함수가 필요할 떄에만 갱신하도록 수정함
    async needDetial => {
      const data = await fetchUser(userId, needDetail);
      setUser(data);
    }, [userId]);

  useEffect(() => {
    fetchAndSetUser(false);
  },[fetchAndSetUser]); // 이제 userId가 변경될 때에만 호출함

  if(!user) {
    return <h1>로딩...</h1>
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{`캐시: ${user.cash}`}</p>
      <p>{`계정 생성일: ${user.createAt}`}</p>
      <button onClick={() => fetchAndSetUser(true)}>더보기</button> // fetchUser 함수에 상세 정보가 필요한지 알려주는 needDetail 매개변수를 추가
      <UserDetail user={user} />
    </div>
  );
}

// 부수 효과 함수 내에서 분기 처리하기
function Profile({userId}) {
  const [user, setUser] = useState();
  async function fetchAndSetUser(needDetail) { // 더 이상 useCallback을 사용하지 않아도 됨
      const data = await fetchUser(userId, needDetail);
      setUser(data);
  }
  useEffect(() => {
    if(!user || user.id !== userId) { // if문으로 fetchAndSetUser 호출 시점을 관리
      fetchAndSetUser(false);
    }
  })
}

// 이전 상탯값을 기반으로 다음 상탯값을 계산하는 경우
function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function onClick() {
      setCount(count + 1); // 이전 상탯값을 기반으로 다음 상탯값을 계산
    }
    window.addEventListener("click", onClick);
    return() => window.removeEventListener("click", onClick);
  }, [count]); // 이전 상탯값을 이용하기 위해 상탯값을 의존성 배열에 추가
  // ...
}

// 상탯값 변경 함수에 함수를 입력해서 의존성 배열을 제거
function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function onClick() {
      setCount(prev => prev + 1); // 이전 상탯값을 매개변수로 받음
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click",onClick);
  }); // 상탯값을 의존성 배열에서 제거
  // ...
}

// 여러 상탯값을 참조하면서 값을 변경하는 코드
function Timer({initialTotalSeconds}) {
  const [hour, setHour] = useState(Math.floor(initialTotalSeconds/3600)); // 3가지 상탯값 사용
  const [minute, setMinute] = useState(Math.floor(initialTotalSeconds/3600)/60);
  const [second, setSecond] = useState(initialTotalSeconds%60);
  useEffect(() => {
    const id = setInterval(() => { // 1초마다 타이머 차감
      if(second) {
        setSecond(second - 1);
      } else if (minute) {
        setMinute(minute - 1);
        setSecond(59);
      } else if (hour) {
        setHour(hour - 1);
        setMinute(59);
        setSecond(59);
      }
    }, 1000);
    return () => clearInterval(id);4
  }, [hour, minute, second]); // 세 가지 상탯값을 모두 의존성 배열에 추가 (setInterval을 사용한 것과 무관하게, 1초마다 clearInterval과 setInterval을 반복 호출함)
}
// useReducer 훅을 사용한 의존성 배열 제거
function Timer({initialTotalSeconds}) {
  const [state, dispatch] = useReducer(reducer, { // 세 상탯값 모두 useReducer 함수로 관리, useReducer 훅의 두 번째 매개변수는 초기 상탯값임
    hour: Math.floor(initialTotalSeconds/3600),
    minute: Math.floor(initialTotalSeconds/3600)/60,
    second: initialTotalSeconds%60,
  })
  const {hour, minute, second} = state;
  useEffect(() => {
    const id = setInterval(dispatch, 1000);
    return () => clearInterval(id);
  });  //  dispatch는 변하지 않는 값이므로 의존성 배열을 제거할 수 있음
}

function reducer(state) { // 상탯값을 변경하는 로직은 reducer 함수에서 구현하며, 물론 시, 분, 초를 하나의 객체에 담아서 useState 훅으로 관리할 수 있음, useState 훅을 사용하여 의존 배열을 제거하는 것도 가능함
  const {hour, minute, second} = state;
  if(second) {
    return {...state, second: second - 1};
  } else if(minute) {
    return {...state, minute: minute - 1, second: 59 }
  } else if(hour) {
    return { hour: hour - 1, minute: 59, second: 59 }
  } else {
    return state;
  }
}

// useRef 활용
// 자주 변경되는 속성값을 의존성 배열에 추가한 코드
function MyComponent({onClick}) {
  useEffect(() => {
    window.addEventListener("click", () => {
      onClick();
      // ...
    });
    // 연산량이 많은 코드
  }, [onclick]); // 속성값으로 전달된 함수 내용은 그대로인데, 렌더링할 때마다 변경되는 경우가 많음, 이로 인한 부수 효과 함수가 불필요하게 호출됨
  // ...
}

// useRef 훅으로 부수 효과 함수가 자주 호출되지 않도록 개선
function MyComponent({onClick}) {
  const onClickRef = useRef(); // onClick을 useRef에 저장함,
  useEffect(() => {
    onClickRef.current = onclick;
  });

  useEffect(() => {
    window.addEventListener("click", () => {
      onClickRef.current();
    });
    // ...
  }); // 부수 효과 함수에서 사용된 useRef 값은 의존성 배열에 추가할 필요가 없음
  // ...
}

// useRef 값을 컴포넌트 함수에서 직접 변경
function Mycomponent({onclick}) {
    const onClickRef = useRef();
    onClickRef.current = onClick; // 부수 효과 함수에서 값을 수정하는 겂보다 빠른 시점에 수정함, useEffect 코드를 작성하는 것보다 간편함
}