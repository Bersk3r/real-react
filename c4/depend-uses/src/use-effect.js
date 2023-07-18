// useEffect 훅에서 API를 호출하는 코든
function Profile({userId}) {
  const [user,setUser] = useState();
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data)); // fetch 함수는 렌더링될 때마다 호출 => userID가 변경되도 새로운 사용자 정보 제공 불가
  });
  // ...
}

// 의존성 배열로 API 호출 횟수를 최적화
function Profile({userId}) {
  const [user,setUser] = useState();
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [userId]); // userId가 바뀔때만 함수를 호출
  // ...
}

// 부수 관리 효과 함수를 잘못 관리한 케이스
const [needDetail, setNeedDetail] = useState(false);
useEffect(() => {
  fetchUser(userId,needDetail).then(data => setUser(data)); // needDetail을 부수 효과 함수에서 사용
}, [userId]); // 부수 효과 함수를 수정할 때, 새로운 상탯값이 의존성 배열에 없음


// 의존성 배열을 잘못 관리한 경우
function MyComponent() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  useEffect(() => {
    const id = setInterval(() => console.log(value1, value2), 1000);
    return () => clearInterval(id);
  }, [value1]); // value2가 의존성 배열에 존재하지 않음, value2가 변경되어도 부수 효과는 갱신되지 않으며, value2가 변경되기 전의 등록된 부수 효과 함수가 계속 사용됨
  return (
    <div>
      <button onClick={() => setValue1(value1 + 1)}>value1 증가</button>
      <button onClick={() => setValue2(value2 + 1)}>value2 증가</button>
    </div>
  );
}