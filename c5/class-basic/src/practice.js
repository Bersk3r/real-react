import React from 'react';

class MouseTracer extends React.Component {
  state = {
    x: null,
    y: null,
  };
  onMouseMove = e => {
    this.setState({
      x: e.clientX, // 마우스가 이동할 때마다, 좌표값을 갱신함
      y: e.clientY,
    });
  };
  render() {
    const {children} = this.props;
    const {x, y} = this.state;
    return <div onMouseMove={this.onMouseMove}>{children({x,y})}</div>; // 현재 좌표값과 함께 children 함수를 호출
  }
}

// MyComponent.tsx
export default function MyComponent() {
  return (
    <MouseTracer>{({x,y}) => <p>{`(x,y): (${x}, ${y})`}</p>}</MouseTracer> // MyComponent에서 현재 마우스의 위치 정보를 이용할 수 있게 되엇으며, 매개변수를 넘길 때는 명명된 매개변수를 사용하는 게 좋음
  )
}