import React, { useState, useEffect } from "react";
function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `업데이트 횟수: ${count}`;
  });
  return <button onClick={() => setCount(count + 1)}>increase</button>;
}

function Profile({userId}) {
  const [user, setUser] = useState(null); // API의 결과 값을 저장할 상탯값
  useEffect(
    () => {
      getUserApi(userId).then(data => setUser(data)); // 부수 효과 함수에서 API 통신을 하면 받아온 데이터는 user 상탯값에 저장됨
    },
    [userId], // userId가 변경되는 경우에만 API 통신 진행
  );
  return (
    <div>
      {!user && <p>사용자 정보를 가져오는 중 ...</p>}
      {user && (
       <>
         <p>{`name is ${user.name}`}</p>
         <p>{`age is ${user.age}`}</p>
       </>
      )}
    </div>
  );
}

function WidthPrinter() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize); // 창 크기가 변경될 때마다 onResize가 호출되는 이벤트 핸들러 등록
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return <div>{`width is ${width}`}</div>;
}