// constructor 메서드 기본 구조
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // ...
  }
}

// 초기 속성 값으로부터 상탯값을 만드는 코드
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // 상탯값을 직접 할당하는 것은 constructor 메서드에서만 가능함
      currentMovie: props.age < 10 ? '뽀로로' : '어벤저스',
    };
  }
}

// constructor 메서드를 사용하지 않고, 속성 값을 이용하는 코드
class MyComponent extends React.Component {
  state = {
    currentMovie: this.props.age < 10 ? '뽀로로' : '어벤저스',
  };
}

// 속성값에 항상 의존적인 상탯값을 함수로 대체한 코드
class MyComponent extends React.Component {
  getCurrentMovie() {
    const {age} = this.props;
    return age < 10 ? '뽀로로' : '어벤저스';
  }
}

// constructor 메서드에서 setState 메서드를 호출하는 잘못된 예
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.setState({count: 10}); // constructor 메서드 내부에서 호출된 setState 메서드는 무시됨
  }
  render() {
    const { count } = this.state;
    return <div>{count}</div>; // render 메서드에선 초기값 0이 출력됨
  }
}

// constructor 메서드에서 API를 호출하는 잘못된 예
class MyComponent extends React.Component {
  state = {
    products: [],
  };
  constructor() {
    super(props);
    callApi('/products').then(data => {
      // ...
      this.setState({products: data});
    })
  }
}

// getDerivedStateFromProps에서 이전 속성값 이용하기
class MyComponent extends React.Component {
  state = {
    // ..
    prevSpeed: this.props.speed, // 해당 상탯값은 이전 속성값을 저장하기 위한 용도로 사용
  };

  /**
   *
   * @param props
   * @param state
   * @returns {{prevSpeed}|null}
   */
  static getDerivedStateFromProps(props, state) {
    if(props.speed !== state.prevSpeed) { // getDerivedStateFromProps 메서드에서 속성값이 변경된 경우에 필요한 처리를 하고, 변경된 속성값을 상탯값으로 저장
      // ...
      return {
        // ...
        prevSpeed: props.speed,
      };
    }
    return null; // 상탯값을 변경할 필요가 없으면 null을 반환
  }
}

// componentDidUpdate 메서드에서 API를 호출하는 코드
class MyComponent extends React.Component {
  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (prevProps.productId !== productId) {
      this.requestData(productId); // requestData를 호출하려면 this 객체가 필요하므로 getDerivedStateFromProps 메서드에서 호출할 수 없음
    }
  }
}

// getDerivedStateFromProps 메서드를 이용한 메모이제이션
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { products } = props;
    if (products !== state.prevProducts) { // 상품 리스트가 변경된 경우, filteredProducts 값을 새로 계산함
      return {
        filterProducts: products.filter(product => product.price < 1000),
        prevProducts: products,
      };
      return null;
    }
  }
  render() {
    const { filteredProducts } = this.state;
    return <div>{filteredProducts.map(/*...*/)}</div>;
  }
}


// 로다시 패키지를 이용한 메모이제이션 예
import meomize from 'lodash/memoize'; // 메모이제이션을 위해 로다시 패키지의 memoize 함수를 이용


class MyComponent extends React.Component {
  getFilteredProducts = memoize(function(products) { // getFilteredProducts 메서드는 products 매개변수가 변경되는 경우에만 계산하고, 그렇지 않으면 이전 결과를 반환
    return products.filter(product => product.price < 1000);
  });
  render() {
    const {products} = this.props;
    const filteredProducts = this.getFilteredProducts(products); // render 메서드가 호출될 때마다 getFilteredProducts 메서드를 호출함
    return <div>{filteredProducts.map(/*...*/)}</div>;
  }
}

/** 속성값 변경 시 상탯값을 초기화하는 코드 */
class PriceInput extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if(props.price !== state.prevPrice) { // price 속성값이 변경되면 price 상탯값을 새로운 값으로 초기화함
      return {
        price: props.price,
        prevPrice: props.price,
      };
    }
    return null;
  }
  onChange = event => {
    const price = Number(event.target.value);
    if(!Number.isNaN(price)) {
      this.setState({price}); // price 상탯값은 사용자 입력에 따라 변경될 수 있음 (부모 컴포넌트에서 값이 변경되어도 값이 같으면 변경되지 않음)
    }
  };
  render() {
    const {price} = this.state;
    return <input onChange={this.onChange} value={price} />;
  }
}

/** key 속성 값을 이용한 코드 */
class ProductEdit extends React.Component {
  // ...
  redner() {
    const {product} = this.props;
    return <PriceInput key={product.id} value={product.price} />; // product.id를 key 속성값으로 입력했으므로 상품이 변경되면 PriceInput 컴포넌트 인스턴스는 다시 생성됨
  }
}

class PriceInput extends React.Component {
  state = {
    price: this.props.price, // PriceInput 컴포넌트에서 초기 가격만 상탯값에 넣으면 되므로, 이제 getDerivedStateFromProps 메서드는 필요 없어짐
  };
  onChange = event => {
    const price = Number(event.target.value);
    if(!Number.isNaN(price)) {
      this.setState({price});
    }
  };
  render() {
    const {price} = this.state;
    return <input onChange={this.onChange} value={price} />;
  }
}

/** 상탯값을 부모 컴포넌트에서 관리하는 코드 */
class ProductEdit extends React.Component {
  state = {
    currentPrice: this.props.product.price, // PriceInput 컴포넌트가 가지고 있던 상탯값을 부모 컴포넌트가 관리
  };
  onChangePrice = event => { // 상탯값을 변경하는 이벤트 처리 메서드도 부모 컴포넌트에서 정의함
    const currentPrice = Number(event.target.value);
    if(!Number.isNaN(currentPrice)) {
      this.setState({currentPrice});
    }
  };
  render() {
    const { currentPrice } = this.state;
    return <PriceInput onChange={this.onChangePrice} value={currentPrice} />;
  }
}

function PriceInput({price, onChange}) { // PriceInput 컴포넌트에서 상탯값과 이벤트 처리 메서드를 구현할 필요가 없으므로 함수형 컴포넌트로 정의할 수 있음
  return <input onChange={onChange} value={price} />;
}

/** 상탯값이 전후 속성값에 의존적인 경우 */
class MyComponent extends React.Component {
  state = {
    // ...
    prevSpeed: this.props.speed,
    isMovingFaster: false,
  };

  static getDerivedStateFromProps(props, state) {
    if(props.speed !== state.prevSpeed) {
      return {
        isMovingFaster: state.prevSpeed < props.speed, // isMovingFaster 상탯값은 이전 속성값과 이후 속성값으로 계산됨, 전후 속성값에 의존적이므로 getDerivedStateFromProps 메서드를 사용하는 게 적절함
        prevSpeed: props.speed,
      };
    }
    return null;
  }
}

/**componentDidMount 메서드에서 돔 요소에 접근하는 코드*/
class Box extends React.Component {
  state = {
    boxWidth: 0,
  };
  divRef = React.createRef(); // 돔 요소에 접근하기 위해 createRef 함수를 사용
  componentDidMount() {
    const rect = this.divRef.current.getBoundingClientRect();
    this.setState({boxWidth: rect.width});
  }
  render() {
    const {boxWidth} = this.state;
    const backgroundColor = boxWidth < 400 ? 'red' : 'blue';
    return (
      <div
        ref={this.divRef}
        style={{width: '100%', height: '100px', backgroundColor}}
      >
        box
      </div>
    );
  }
}
/** constructor 메서드에서 API 요청을 보내는 코드*/
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.dataPromise = requestData();
  }
  componentDidMount() {
    this.dataPromise.then(data => this.setState({data})); // componentDidMount 메서드에서 API 응답값을 컴포넌트 상탯값으로 저장함
  }
}

/**shouldComponentUpdate 메서드의 기본 구조*/
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { price } = this.state;
    return price !== nextState.price; // price 상탯값이 변경된 경우에만 참을 반환하므로, 속성값이나 상탯값이 변경되도 렌더링은 하지 않음
  }
}

/** 돔 요소의 높잇값이 변경됐는지 검사하는 코드 */
class MyComponent extends React.Component {
  state = {
    items: [],
  };

  divRef = React.createRef(); // 높잇값 변경을 검사할 div 요소의 ref 객체를 정의함
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { items } = this.state;
    if(prevState.item.length < items.length) { // 데이터가 추가되기 직전에 div의 높잇값을 반환함
      const rect = this.divRef.current.getBoundingClientRect();
      return rect.height;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) { // getSnapshotBeforeUpdate 메서드에서 반환한 값이 componentDidUpdate 메서드의 세 번째 매개변수가 들어옴
    if(snapshot !== null) {
      const rect = this.divRef.current.getBoundingClientRect();
      if(rect.height !== snapshot) { // 높잇값이 변경되면, 알림창을 띄움
        alert('새로운 줄이 추가되었습니다.');
      }
    }
  }
  onClick = () => {
    const {items} = this.state;
    this.setState({items: [...items, '아이템']});
  };
  render() {
    const {items} = this.state;
    return (
      <React.Fragment>
        <button onClick={this.onClick}>추가하기</button>
        <div // div 요소 안에 데이터 갯수만큼의 span 요소를 넣기 때문에 데이터 갯수에 따라 div 요소의 높이가 변함
          ref={this.divRef}
          style={{width: '100%'}}
        >
          {items.map(item => <span style={{height: 50}}>{item}</span>)}
        </div>
      </React.Fragment>
    );
  }
}

class MyComponent extends React.Component {
  state = {
    text: '',
  };
  divRef = React.createRef();
  componentDidUpdate() {
    const div = this.divRef.current;
    const rect = div.getBoundingClientRect();
    if(div.scrollWidth > rect.width) { // div 요소의 가로 크기보다 스크롤 영역의 가로 길이가 더 크면 스크롤이 가능하다고 알려줌
      alert('스크롤이 가능합니다.');
    }
  }

  onChange = event => {
    const text = event.target.value;
    this.setState({text});
  };
  render() {
    const {text} = this.state;
    return (
      <React.Fragment>
        <input onChange={this.onChange} value={text} />
        <div
          ref={this.divRef}
          style={{ width: 100, height: 100, overflow: 'scroll'}} // 스크롤이 가능하도록 overflow: scroll 속성을 부여
        >
          {text} // text 상탯값의 문자열이 충분히 길어지면 div 요소 내부는 스크롤이 가능함
        </div>
      </React.Fragment>
    )
  }
}

/**componentDidUpdate 메서드에서 API를 호출하는 메서드*/
class UserInfo extends React.Component {
  componentDidUpdate(prevProps) { // componentDidUpdate 메서드 내부에서는 이전, 이후의 상탯값과 속성값을 모두 알 수 있으므로 이런 코드 작성이 가능
    const {user} = this.props;
    if(prevProps.user.id !== user.id) {
      requestFreinds(user).then(friends => this.setState({friends}));
    }
  }
}

/**componentDidMount 메서드에서도 API를 호출하도록 변경하기*/
class UserInfo extends React.Component {
  componentDidMount() {
    const {user} = this.props;
    this.setFriends(user); // componentDidMount 메서드와 componentDidUpdate 메서드 양쪽에서 친구 목록을 가져옴
  }
  componentDidUpdate(prevProps) {
    const {user} = this.props;
    if(prevProps.user.id !== user.id) {
      this.setFriends(user);
    }
  }
  setFriends(user) {
    requestFriends(user).then(friends => this.setState({friends}));
  }
}

/** componentWillUnmount 메서드에서 이벤트 처리 메서드 이해하기 */
class MyComponent extends React.Component {
  componentDidMount() {
    const domNode = document.getElementById('someNode');
    domNode.addEventListener('change', this.onChange);
    domNode.addEventListener('dragstart', this.onDragStart);
  }
  componentWillUnmount() {
    const domNode = document.getElementById('someNode');
    domNode.removeEventListener('change', this.onChange);
    domNode.removeEventListener('dragstart', this.onDragStart);
  }
}

/**ErrorBoundary 컴포넌트를 사용하지 않은 경우*/
class ErrorBoundary extends React.Component {
  state = {error: null};
  static getDerivedStateFromError(error) {
    return {error}; // getDerivedStateFromError에서 자식 컴포넌트에서 예외가 발생하면 상탯값에 에러 정보를 저장함, getDerivedStateFromError에서 반환한 값은 기존 상탯값과 병합됨
  }
  componentDidCatch(error, errorInfo) {
    sendErrorToServer(error, info); // componentDidCatch 메서드에서 에러 정보를 서버로 전송함
  }
  render() {
    const {error} = this.state;
    if(error) {
      return <div>{error.toString()}</div>;
    }
    return this.props.children; // render 메서드에서는 에러가 존재하면 에러 정보를 렌더링하고, 없다면 자식 컴포넌트를 렌더링함
  }
}

class Counter extends React.Component {
  state = {count: 0};
  onClick = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
  };
  render() {
    const {count} = this.state;
    if(count >= 3) { // Counter 컴포넌트의 버튼을 세 번 클릭하면 예외가 발생함
      throw new Error('에러 발생 !!!');
    }
    return <div onClick={this.onClick}>{`클릭하세요(${count})`}</div>;
  }
}

function App() {
  // ErrorBoundary 컴포넌트를 애플리케이션의 최상위 컴포넌트로 만들었음 => 자식 컴포넌트에서 발생하는 예외를 처리할 수 있음
  return (
    <ErrorBoundary>
      <Counter />
    </ErrorBoundary>
  );
}

/** 이벤트 처리 메서드에서 예외가 발생하는 경우 */
onClick = () => {
  this.setState({name: 'mike'}); // 예외 발생 이전 setState 메서드는 정상적으로 상탯값을 변경함
  throw new Error('some error');
  this.setState({age: 23}); // 예외가 발생한 코드 밑에 있는 setState 메서드는 호출되지 않음 => 일부 상탯값만 변경되기 때문에 잘못된 정보가 사용자에게 노출될 수 있음
}

/**이벤트 처리 메서드에서 예외를 처리하는 코드*/
onClick = () => {
 try { // 이벤트 처리 메서드에서 예외 처리를 하기 위해 try/catch 문을 사용함
   this.setState({name: 'mike'});
   throw new Error('some error');
   this.setState({age: 23});
 } catch (e){ // 예외 발생 시, 상탯값을 롤백함
   // ...
 }
}


