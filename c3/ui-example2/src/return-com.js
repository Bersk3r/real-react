function FirstComponent() {
  return <MyComponent title="안녕하세요" />;
  return <p>안녕하세요</p>;
  return '안녕하세요';
  return 123;
  return [<p key="a">안녕하세요</p>,<p key="b">반갑습니다</p>];
  return (
    <React.Fragment>
      <p>안녕하세요</p>
      <p>반갑습니다</p>
    </React.Fragment>
  );
  return (
    <>
      <p>안녕하세요</p>
      <p>반갑습니다</p>
    </>
  );
  return null;
  return false;
  return ReactDoM.createPortal(<p>안녕하세요</p>, domNode);
}

function SecondComponent({title}) {
  return title.length > 0 && <p>{title}</p>
  // title 값이 0이면 false를 반환하여 아무것도 렌더링이 되지 않음
  // title 값이 1 이상이면 p 요소를 반환
}

function Modal({title, desc}) {
  const domNode = document.getElementById('modal');
  return ReactDOM.createPortal(
    <div>
      <p>{title}</p>
      <p>{desc}</p>
    </div>,
    domNode,
  );
}
// export default FirstComponent;
// export default SecondComponent;
