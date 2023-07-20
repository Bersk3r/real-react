import {Component} from "react";

/** 마운트 시 서버로 이벤트를 보내는 고차 컴포넌트*/
function withMountEvent(InputComponent, componentName) { // withMountEvent가 고차 컴포넌트임, 해당 함수를 이용하여 만들어진 모든 컴포넌트는 마운트될 때마다 서버로 이벤트를 보냄
  return class OutputComponent extends Component {
    componentDidMount() {
      sendMountEvent(componentName);
    }
    render() {
      return <InputComponent {...this.props} />;
    }
  };
}

// MyComponent.jsx
function MyComponent() {
  // ...
}

export default withMountEvent(MyComponent, 'MyComponent'); // 공통 기능을 적용하고 싶은 컴포넌트를 고차 컴포넌트의 인수로 입력함
/** 마운트 여부를 알려주는 고차 컴포넌트 */
function withHasMounted(InputComponent) {
  // 서버 렌더링을 사용하는 프로젝트에서는 화면 일부분이 클라이언트 측에서만 렌더링되기를 원하는 경우가 많이 발생함
  return class OutputComponent extends React.Component {
    state ={
      hasMounted: false,
    };
    componentDidMount() {
      this.setState({hasMounted: true});
    }
    render() {
      const { hasMounted } = this.state;
      return <InputComponent {...this.props} hasMounted={hasMounted} />;
    }
  };
}

/** 로그인 여부에 따라 다르게 보여주는 고차 컴포넌트*/
function withOnlyLogin(InputComponent) { // 로그인한 사용자에게 정보를 보여주고 그렇지 않은 경우, 경고를 출력 => 고차 컴포넌트를 사용하지 않으면 모든 컴포넌트에 일일히 로그인 여부를 검사하는 코드를 추가해야 함
  return function({ isLogin, ...rest}) { // 이 때, 필요하지 않은 값은 속성값으로 전달하지 않음
    if(isLogin) {
      return <InputComponent {...rest} />;
    } else {
      return <p>권한이 없습니다.</p>;
    }
  };
}
/**클래스 상속을 이용한 고차 컴포넌트*/
function withSomething(InputComponent) {
  return class OutputComponent extends InputComponent {
    // ...
  };
}
/**디버깅에 사용되는 고차 컴포넌트*/
function withDebug(InputComponent) {
  return class OutputComponent extends InputComponent {
    // this 객체를 이용하여 입력된 컴포넌트의 속성값과 상탯값에 접근하고 있음
    render() {
      // 입력된 컴포넌트는 render 메서드를 호출함 => 결과적으로 withDebug 고차 컴포넌트는 입력된 컴포넌트 위에 속성값과 상탯값을 항상 보여줌
      return (
        <React.Fragment>
          <p>props: {JSON.stringify(this.props)}</p>
          <p>state: {JSON.stringify(this.state)}</p>
          {super.render()}
        </React.Fragment>
      );
    }
  };
}
/**div 요소로 감싸주는 고차 컴포넌트*/
export function withDiv(InputComponent) {
  return class OutputComponent extends InputComponent {
    render() {
      const rendered = super.render(); // 입력된 요소의 render 메서드를 호출함
      if(rendered && rendered.type !== 'div') { // 최상위 요소가 div가 아니라면 div로 감쌈
        return React.createElement('div', null, rendered);
      }
      return rendered;
    }
  };
}
/**여러 개의 고차 컴포넌트 사용하기*/
withDebug(withDiv(MyComponent));

/** 고차 컴포넌트에서 displayName 설정하기*/
import {getDisplayName} from "react-recompose/getDisplayName";
import {Component} from "react";

function withSomething(InputComponent) {
  return class OutputComponent extends Component {
    // ...
  }

  OutputComponent.displayName = `withSomething(${getDisplayName(
    InputComponent,
  }))`;
  return OutputComponent;
}
/**고차 컴포넌트에서 정적 메서드 전달하기*/
import hoistNonReactStatic from 'hoist-non-react-statics';
function withSomething(InputComponent) {
  class OutputComponent extends Component {
    // ...
  }
  hoistNonReactStatic(OutputComponent, InputComponent); // InputComponent 컴포넌트이 모든 정적 메서드를 OutputComponent 컴포넌트로 연결해줌
  return OutputComponent;
}

/**withRouter 고차 컴포넌트*/
import PropTypes from "prop-types";
import {hoistStatics} from "react-recompose"; // 정적 메서드를 전달하기 위해 hoist-react-statics 패키지를 사용함
const withRouter = Component => {
  const C = props => {
    const { wrappedComponentRef, ...remainingProps} = props;
  }
  return (
    <Route
      render={routeComponentProps => (
        <Component
          {...remainingProps}
          {...routeComponentProps}
          ref={wrappedComponentRef} // ref 속성값을 전달하기 위해 wrappedComponentRef라는 속성값을 사용
        />
      )}
    />
  );

  C.displayName = `withRouter(${Component.displayName || Component.name})`; // 편리한 디버깅을 위해 displayName 설정
  C.wrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func,
  };
  return hoistStatics(C, Component);
};

export default withRouter;

/**마운트 시 서버로 이벤트를 보내는 렌더 속성 값*/
// MountEvent.jsx
class MountEvent extends Component {
  componentDidMount() {
    const {name} = this.props;
    sendMountEvent(name);
  }
  render() {
    const {children} = this.props;
    return children(); // 속성값 children은 함수이고, children 함수의 반환값을 render 메서드의 반환값으로 사용함
  }
}

// MyComponent.jsx
function MyComponent() {
  return (
    <MountEvent name="MyComponent">{() => <div>{/*...*/}</div>}</MountEvent> // 결과적으로 <div>{/* ... */}</div> 코드가 렌더링됨 => children 속성값은 함수가 될 수 있음
  );
}

/** children을 사용하지 않는 렌더 속성값*/
function MyComponent() { // render라는 이름의 속성값이 children을 대체함
  return (
    <MountEvent name="MyComponent" render={() => <div>{/*...*/}</div>} />
  );
}
/** 데이터 처리 로직을 렌더 속성값으로 구현하기*/'' +
// DataFetcher.tsx
import React from 'react';
import axios from 'axios';

class DataFetcher extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    const {url, parseData} = this.props;
    axios(url).then(response => {
        const data = parseData(response.data);
        this.setState({data});
      });
  }

  render() {
    const {children} = this.props;
    const {data} = this.state;
    if(data == null) { // 데이터가 도착하기 전까지는 DataFetcher가 자체적으로 로딩 문구를 보여주고, 도착 후에는 사용하는 측에서 정의하는 함수가 호출됨
      return <p>데이터 로딩 중...</p>;
    } else {
      return children({data});
    }
  }
}

// MyComponent.tsx
export default function MyComponent() {
  return (
    <DataFetcher
      url="https://api.github.com/repos/facebook/react" // DataFetcher 컴포넌트를 사용하는 입장에서는 API 주소와 데이터 파싱 함수를 전달함
      parseData={parseRepoData}
    >
      {({data}) => (
        <div>
          <p>{`name: ${data.name}`}</p>
          <p>{`stars: ${data.stars}`}</p>
          <p>{`open issues: ${data.openIssues}`}</p>
        </div>
      )}
    </DataFetcher>
  );
}

function parseRepoData(data) {
  return {
    name: data.name,
    stars: data.stargazers_count,
    openIssues: data.open_issues,
  };
}


/** 마우스의 우치ㅣ 정보를 알려주는 렌더 속성값*/
// MouseTracer.tsx
import React from 'react';

class MouseTracer extends React.Component {
  state = {
    x: null,
    y: null,
  };
  onMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    const {children} = this.props;
    const {x, y} = this.state;
    return <div onMouseMove={this.onMouseMove}>{children({x,y})}</div>;
  }
}

// MyComponent.tsx
export default function MyComponent() {
  return (
    <MouseTracer>{({x,y}) => <p>{`(x,y): (${x}, ${y})`}</p>}</MouseTracer>
  )
}
/** 렌더 속성값 함수의 매개변수를 속성값으로 전달하는 방법*/
// MountInfo.tsx
import React from 'react';

class MountInfo extends React.Component {
  state = {
    hasMounted: false,
  };
  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }
  render() {
    const {children} = this.props;
    const {hasMounted} = this.state;
    return children({hasMounted}); // MountInfo 컴포넌트는 마운트 정보와 함께 children 함수를 호출함
  }
}

// MyComponent.tsx
class MyComponent extends React.Component {
  componentDidUpdate() {
    const {hasMounted} = this.props; // MountInfo 컴포넌트로부터 전달된 마운트 정보를 생명 주기 메서드에서 사용하고 있음
    console.log(`lifecycle functions can access hasMounted(${hasMounted})`);
  }
  render() {
    const {hasMounted} = this.props;
    return <p>{`hasMounted: ${hasMounted}`}</p>;
  }
}

export default function MyComponentWrapper(props) { // 외부로 MyComponentWrapper를 노출함
  // 마운트 정보를 MyComponent 컴포넌트의 속성값으로 전달함
  return (
    <MountInfo>
      {({hasMounted}) => <MyComponent {...props} hasMounted={hasMounted} />}
    </MountInfo>
  );
}
/**children 속성값을 이용하여 작성한 레이아웃 컴포넌트*/
// Layout.jsx
function Layout({children}) {
  // Layout 컴포넌트에 원하는 위치에 children을 렌더링하며, 여기서 children은 함수가 아닌 리액트 요소임
  return (
    <div>
      <div>여기는 Header입니다.</div>
      {children}
      <div>여기는 Footer입니다.</div>
    </div>
  );
}

// MyComponent.jsx
function MyComponent() {
  // Layout 컴포넌트를 사용하는 곳에서는 children 속성값으로 입력될 리액트 요소를 정의함 => 렌더 속성 값을 이용하지 않고, 코드를 재사용할 수 있는 매우 간단하고 중요한 방법임
  return (
    <Layout>
      <div>{/* ... */}</div>
    </Layout>
  );
}
/**렌더 속성값이 중첩되면 코드가 복잡해진다*/
function MyComponent() {
  return (
    <MountEvent name="MyComponent">
      {() => (
        <DataFetcher
          url="https://api.github.com/repos/facebook/react"
          parseData={parseRepoData}
        >
          {({data}) => (
            <div>
              <MouseTracer>
                {({x,y}) => <p>{`(x,y): (${x} ${y})`}</p>}
              </MouseTracer>
              <p>{`name: ${data.name}`}</p>
              <p>{`stars: ${data.stars}`}</p>
              <p>{`open issues: ${data.openIssues}`}</p>
            </div>
          )}
        </DataFetcher>
      )}
    </MountEvent>
  );
}
/***/