import {useEffect, useReducer, useState} from "react";

/** 훅으로 변환할 constructor 메서드*/
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: `${props.firstName} ${props.lastName}`, // 속성값으로부터 초기 상탯값을 계산함
    };
    callApi(); // componentDidMount보다 빠른 시점에 API를 호출
  }
  // ...
}

/** constructor 메서드를 훅으로 구현하기*/
function Profile({firstName, lastName}) {
  const [name, setName] = useState(`${firstName} ${lastName}`); // 속성값으로부터 계산된 초기 상탯값은 useState의 인수로 사용
  const isFirstRef = useRef(true); // 컴포넌트 최초 호출 시에만 callApi 함수를 호출하기 위해 useRef 훅을 사용
  if(isFirstRef.current) {
    isFirstRef.current = false;
    callApi();
    callApi();
  }
  // ...
}
/** usePrevious 커스텀 훅 */
function usePrevious(value) { // 매개변수로부터 현재 값을 입력 받음
  const valueRef = useRef(); // 이전 값을 기억하기 위해 useRef 훅을 이용
  useEffect(() => { // 렌더링 후에는 현재 값을 이전 값으로 만듦
    valueRef.current = value;
  }, [value]);
  return valueRef.current; // 이전 값을 반환함
}
/** 훅으로 변환할 componentDidUpdate 메서드*/
class Profile extends React.Component {
  state = {name: this.props.name};
  componentDidUpdate(prevProps) {
    const { userId, name} = this.props;
    if(prevProps.userId !== userId) { // userId가 변경된 경우, name 상탯값을 새로운 사용자의 이름으로 변경함
      this.setState({name});
    }
  }
  // ...
}
/** componentDidUpdate 메서드를 훅으로 변환하기*/
function Profile(props) {
  const [name, setName] = useState(props.name);
  const prevUserId = usePrevious(props.userId); // usePrevious 훅을 이용하여 이전 userId를 저장
  const isMountRef = useRef(false); // 마운트 여부를 useRef 훅으로 관리
  useEffect(() => {
    if(isMountedRef.current) {
      if(prevUserId !== props.userId) {  // userId가 변경된 경우 name 상탯값을 새로운 사용자 이름으로 변경함
        setName(props.name);
      }
    } else {
      isMountRef.current = true;
    }
  });
  // ...
}
/** useOnUpdate 커스텀 훅 */
function useOnUpdate(func) {
  const isMountedRef = useRef(false);
  useEffect(() => {
    if(isMountedRef.current) {
      func();
    } else {
      isMountedRef.current = true;
    }
  });
}
/** 훅으로 변경할 getDerivedStateFromProps 메서드*/
class SpeedIndicator extends React.Component {
  state = {isFaster: false, prevSpeed: 0}; // 이전 속도를 prevSpeed 상탯값에 저장
  static getDerivedStateFromProps(props, state) { // 속성값이 변경되면 관련된 상탯값도 변경됨
    if(props.speed !== state.prevSpeed) {
      return {
        isFaster: props.speed > state.prevSpped,
        prevSpeed: props.speed,
      };
    }
    return null;
  }
  render() {
    const {isFaster} = this.state;
    return <p>It's getting faster: {isFaster ? 'yes' : 'no'}</p>;
  }
}
/** getDerivedStateFromProps 정적 메서드를 훅으로 변경하기*/
function SpeedIndicator({speed}) {
  const [isFaster, setIsFaster] = useState(false);
  const [prevSpeed, setPrevSpeed] = useState(0);
  if(speed !== prevSpeed) { // speed 속성 값이 변경되면 렌더링 과정에서 바로 상탯값을 변경함
    setIsFaster(speed > prevSpeed);
    setPrevSpeed(speed);
  }
  return <p>It's getting faster: {isFaster ? 'yes' : 'no'}</p>;
}

/** useReducer 훅을 이용하여 forceUpdate 메서드 구현*/
function MyComponent() {
  const [_, forceUpdate] = useReducer(s => s + 1,0); // forceUpdate 함수를 호출하면 상탯값이 항상 변경되므로 클래스형 컴포넌트의 forceUpdate처럼 동작함
  function onClick() {
    forceUpdate();
  }
  // ...
}

/**디바운스 기능을 제공하는 useDebounce 훅의 구현 및 사용*/
function useDebounce({callback, ms, deps}) { // ms 시간 동안 deps가 변경되지 않으면 callback 함수를 호출하는 커스텀 훅임
  useEffect(() => {
    const id = setTimeout(callback, ms);
    return () => clearTimeout(id);
  }, deps);
}

function Profile() {
  let [name, setName] = useState('');
  let [nameTemp, setNameTemp] = useState('');
  useDebounce({ // 사옹자가 입력하는 문자열을 nameTemp에 기록하닥 1초간 입력이 없으면 name에 저장
    callback: () => setName(nameTemp),
    ms: 1000,
    deps: [nameTemp],
  });
  return (
    <div>
      <p>{name}</p>
      <input
        type="text"
        onChange={e=> setNameTemp(e.currentTarget.value)}
        value={nameTemp}
      />
    </div>
  );
}

/**useDebounce 훅의 래퍼 컴포넌트*/
function Debounce({children, ...props}) { // 반환값이 없으므로 children 그대로 반환하면 됨
  useDebounce(props);
  return children;
}

class Profile extends React.Component {
  state = {name: '', nameTemp: ''};
  render() {
    const {name, nameTemp} = this.state;
    return (
      <Debounce
        callback={() => this.setState({name: nameTemp})}
        ms={1000}
        deps={[nameTemp]}
      >
        <div>
          <p>{name}</p>
          <input
            type="text"
            onChange={e => this.setState({nameTemp: e.currentTarget.value})}
            value={nameTemp}
          />
        </div>
      </Debounce>
    );
  }
}

/**useMounted 훅의 기능을 제공하기 위해 구현한 고차 컴포넌트와 렌더 속성값*/
function Mounted({children}) {
  const mounted = useMounted();
  return Children(mounted); // 렌더 속성값에서는 children 속성값이 함수이므로 매개변수로 정보를 전달할 수 있음
}

function withMounted(Component) {
  return function(props) {
    const mounted = useMounted();
    return <Component {...props} mounted={mounted} />; // 고차 컴포넌트는 새로 생성하는 컴포넌트의 속성값으로 정보를 전달할 수 있음
  };
}

/**클래스형 컴포넌트에서 withMounted 고차 컴포넌트를 사용하기*/
class MyComponent extends React.Component {
  render() {
    const {mounted} = this.props;
    return <p>{mounted ? 'yes' : 'no'}</p>;
  }
}

export default withMounted(MyComponent);