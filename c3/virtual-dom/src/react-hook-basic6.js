// 콘텍스트 API를 사용하지 않은 경우
function App() {
  return (
    <div>
      <div>상단 메뉴</div>
      <Profile username="mike" /> // 부모 컴포넌트에서 중간 컴포넌트로 속성 값을 전달
      <div>하단 메뉴</div>
    </div>
  );
}

function Profile({username}) {
  return (
    <div>
      <Greeting username={username} /> // 중간 컴포넌트는 전달 받은 속성 값을 활용하지 않고, 곧바로 전달함
      { /* ... */ }
    </div>
  );
}

function Greeting({username}) {
  return (<p>{`${username}님 안녕하세요`}</p>);
}

// 콘텍스트 API를 사용한 경우

const UserContext = React.createContext(''); // createContext 함수를 통해 콘텍스트 객체 생성
function App() {
  return (
    <div>
      <UserContext.Provider value="mike"> // Provider 컴포넌트를 통해 데이터를 전달
        <div>상단 메뉴</div>
        <Profile />
        <div>하단 메뉴</div>
      </UserContext.Provider>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <Greeting /> // 중간 컴포넌트는 전달 받은 속성 값을 활용하지 않고, 곧바로 전달함
      { /* ... */ }
    </div>
  );
}

function Greeting() {
  return (
    <UserContext.Consumer> // Consumer 컴포넌트를 이용하여 데이터를 이용
      {username => <p>{`${username}님 안녕하세요`}</p>}
    </UserContext.Consumer>
  );
}

// 중간 컴포넌트가 다시 렌더링 되지 않도록 React.memo를 사용한 경우
function App() {
  const [username,setUsername] = useState("");
  return (
    <div>
      <UserContext.Provider value={username}>
        <Profile />
      </UserContext.Provider>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)} // 해당 값이 변경되면 리렌더링
        />
    </div>
  );
}

const Profile = React.memo( () => { // 최초에 한 번만 렌더링됨
  return (
    <div>
      <Greeting />
      { /* ... */ }
    </div>
  );
});

function Greeting() { // 위 컴포넌트 렌더링에 상관없이 리렌더링됨
  return (
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요`}</p>}
    </UserContext.Consumer>
  );
}

// 여러 콘텍스트 API를 중첩하여 사용하는 경우
const UserContext = React.createContext('');
const themeContext = React.createContext('dark');

function App() {
  return (
    <div>
      <ThemeContext.Provider value="light"> // Provider 컴포넌트는 중첩이 가능
        <UserContext.Provider value="mike">
          <div>상단 메뉴</div>
          <Profile />
          <div>하단 메뉴</div>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
function Profile() {
  return (
    <div>
      <Greeting />
      { /* ... */ }
    </div>
  );
}

function Greeting() {
  return (
    <ThemeContext.Consumer> // Consumer 컴포넌트도 중첩이 가능
      { theme => (
        <UserContext.Consumer>
          {
            username => (
              <p
                style={{color: theme === 'dark' ? 'gray' : 'green'}}
              >{`${username}님 안녕하세요`}</p>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

// 하위 컴포넌트에서 콘텍스트 데이터 수정하기
const UserContext = React.createContext({username: "", helloCount: 0});
const SetUserConext = React.createContext(() => {}); // 사용자 데이터를 수정하는 함수를 전달하기 위해 콘텍스트를 생성

function App() {
  const [user, setUser] = useState({username: "mike", helloCount: 0}); // 사용자 데이터를 하나의 상탯값으로 관리, 상태값 변경함수는 SetUserContext로 전달할 예정
  return (
    <div>
      <SetUserConext.Provider value={setUser}> // 하위 컴포넌트에서 사용자 데이터를 수정할 수 있도록 콘텍스트 데이터로 전달함
        <UserContext.Provider value={user}>
          <Profile />
        </UserContext.Provider>
      </SetUserConext.Provider>
    </div>
  )
}

function Profile() {
  return (
    <div>
      <Greeting />
      { /* ... */ }
    </div>
  );
}
function Greeting() {
  return (
    <SetUserConext.Consumer>
      {setUser => (
        <UserContext.Consumer>
          {({ username, helloCount}) => (
            <>
              <p>{`${username}님 안녕하세요`}</p>
              <p>{`인사 횟수 : ${helloCount}`}</p>
              <button
                onClick={() => {
                  setUser({username, helloCount: helloCount + 1 }) // 최상위 컴포넌트로 전달된 setUser 함수를 이용하여 이벤트 처리 함수를 구현 (하위 컴포넌트에서 버튼 클릭 시, 콘텍스트 데이터가 수정됨)
                  // 위 내용은 helloCount 속성만 변경되어도 사용자 데이터를 만들어서 속성값 변경 함수에 넘겨줘야 하는 불편함이 존재함
                }}
                >
                인사하기
              </button>
            </>
          )}
        </UserContext.Consumer>
      )}
    </SetUserConext.Consumer>
  );
}

// 불필요한 렌더링이 발생하는 경우
const useContext = React.createContext({ username: ""});

function App() {
  const [username, setUsername] = useState("");
  return (
    <div>
      <UserContext.Provider value={{ username }}></UserContext.Provider> // 콘텍스트 데이터를 객체로 전달하나, 컴포넌트가 렌더링될 때마다 새로운 객체가 생성되어 하위 컴포넌트도 다시 렌더링됨
    </div>
  )
}

function App() {
  const [user, setUser] = useState({username: ""}); // 콘텍스트 데이터 전체를 상탯값으로 관리
  return (
    <div>
      <UserContext.Provider value={user}> // username이 변경될 때에만, 새로운 객체가 전달되므로 불필요한 렌더링이 발생되지 않음
        // ...
      </UserContext.Provider>
    </div>
  )
}

// Provider 컴포넌트를 찾지 못하는 경우
const UserContext = React.createContext('unknown'); // 콘텍스트 데이터의 기본 값인 unknown이 사용됨

function App() {
  return (
    <div>
      <UserContext.Provider value="mike">
        {/* ... */}
      </UserContext.Provider>
      <Profile /> /* Profile 컴포넌트 안에서 사용된 Consumer 컴포넌트는 최상위에 도달할 때까지, Provider 컴포넌트를 잧지 못함 */
    </div>
  );
}
