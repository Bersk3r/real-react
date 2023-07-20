/** 상탯값 일부만 변경하는 코드*/
class MyComponent extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  };

  onClick = () => {
    const {count1} = this.state;
    this.setState({count1: count1 + 1}); // setState 메서드로 입력된 객체는 기존 상탯값과 병합됨 => setState 메서드로 입력되지 않은 count2 상탯값은 변경되지 않음
  };
  // ...
}

/** setState 메서드를 연속해서 호출하는 코드*/
class MyComponent extends  React.Component {
  state = {
    count: 0,
  };

  onClick = () => {
    this.setState({count: this.state.count + 1}); // 의도는 count 값을 두 번 증가시키는 것이나, 의도와 다르게 1만 증가함 => 비동기로 동작하기 떄문, 이 문제는 인수로 함수를 입력하여 해결 가능
    this.setState({count: this.state.count + 1});
  };

  render() {
    console.log('render called'); // onClick 메서드가 호출되어도 해당 로그는 1번만 출력함
    // ...
  }
}

/** setState 메서드의 인수로 함수를 사용하는 코드*/
onClick = () => {
  this.setState(prevState => ({count: prevState.count + 1})); // onClick 메서드를 호출하면 count 상탯값은 2만큼 증가함
  this.setState(prevState => ({count: prevState.count + 1}));
}

const actions = { // 상탯값을 관리하는 로직을 컴포넌트로부터 분리함
  init() {
    return {coun: 0};
  },
  increment(state) {
    return {count: state.count + 1};
  },
  decrement(state) {
    return {count: state.count - 1};
  },
};

class MyComponent extends React.Component {
  state = actions.init();
  onIncrement = () => {
    this.setState(actions.increment); // 컴포넌트에서 setState 메서드를 호출할 떄는 필요한 함수를 인수로 넣음
  };
  onDecrement = () => {
    this.setState(actions.decrement);
  };
  // ...
}

/**setState 메서드의 두 번째 매개변수는 처리가 끝났을 때 호출된다*/
onClick = () => {
  this.setState({count: 123}, () => console.log('count is 123'));
};

/**상탯값을 직접 수정하는 코드*/
onClick = () => {
  this.state.comment = 'hello';
  this.forceUpdate();
};

/**함수 바인딩이 필요한 경우*/
const counter = {
  value: 0,
  increase: function() { // increase 함수는 this.value를 1씩 증가함
    this.value++;
  },
};

counter.increase();
console.log(counter.value); // 1
const incFunc1 = counter.increase(); // 함수를 외부로 전달해서 호출하면 increase 함수의 this 객체가 counter 객체가 아니게 됨
incFunc1();
console.log(counter.value); // 1
const incFunc2 = counter.increase.bind(counter); // 함수의 bind 메서드를 이용하면 increase 함수의 this 객체를 counter 객체로 고정할 수 있음
incFunc2();
console.log(counter.value); // 2



/** 이벤트 처리 메서드의 함수 바인딩 코드를 작성하는 기존의 방법*/
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.onClickInc = this.onClickInc.bind(this); // onClickInc 메서드는 생성자 안에서 바인딩을 하고 있음
  }

  onClickHello(e) { // onClickHello 메서드는 this 객체와 무관하므로, 함수 바인딩이 필요 없음
    e.preventDefault();
    alert('hello world');
  }

  onClickDec(e) {
    const { count } = this.state;
    this.setState({count: count - 1});
  }

  onClickInc(e) {
    const { count } = this.state;
    this.setState({count: count + 1});
  }

  render() {
    // onClickDev 메서드는 render 메서드 내부에서 바인딩을 하고 있음
    return (
      <div>
        <button onClick={this.onClickHello} />
        <button onClick={this.onClickInc} />
        <button onClick={this.onClickDec.bind(this)} />
      </div>
    );
  }
}

/**render 메서드에서 새로운 함수를 생성하는 코드*/
class MyComponent extends Component {
  // ...
  onChangeAge(e) {
    this.setState({age: e.currentTarget.value});
  }
  render() {
    const {name, onChange} = this.props;
    const {age} = this.state;
    return (
      <div>
        <input value={name} onChange={e => onChange(e.currentTarget.value)} />
        <input value={age} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
/**클래스 필드를 이용한 이벤트 처리 메서드의 구현*/
class MyComponent extends Component {
  onClickHello = e => {
    e.preventDefault();
    alert('hello world');
  };
  onClickDec = () => {
    const {count} = this.state;
    this.setState({count: count - 1});
  };
  onClickInc = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
  };
  render() {
    return (
      <div>
        <button onClick={this.onClickHello} />
        <button onClick={this.onClickInc} />
        <button onClick={this.onClickDec} />
      </div>
    );
  }
}
/** 생명 주기 메서드에서 컨텍스트 데이터 사용*/
const ThemeContext = React.createContext('dark');

class MyComponent extends React.Component {
  componentDidMount() {
    const theme = this.context;
    // ...
  }
  // ...
}
MyComponent.contextType = ThemeContext;

/** 생명 주기 메서드에서 여러 개의 컨텍스트 데이터 사용 */
const UserContext = React.createContext('unknown');
const ThemeContext = React.createContext('dark');

class MyComponent extends React.Component {
  componentDidMount() {
    const { username, theme } = this.props; // username, theme 데이터는 MyComponent 내부의 모든 메서드에서 사용할 수 있음
    // ...
  }
  // ...
}

// Consumer 컴포넌트를 이용하여 컨텍스트를 데이터를 MyComponent 컴포넌트의 속성 값으로 넣음
export default props => (
  <UserContext.Consumer>
    <ThemeContext.Consumer>
      {theme => <MyComponent {...props} username={username} theme={theme} />}
    </ThemeContext.Consumer>
  </UserContext.Consumer>
);