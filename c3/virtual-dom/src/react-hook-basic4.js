import React, { useState, useEffect } from "react";

// useUser
function useUser(userId) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(data => setData(data));
  }, [userId]);
  return user;
}

function Profile({userId}) {
  const user = useUser(userId);
  // ...
}

// useWindowWidth
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize); // 창 크기가 변경될 때마다 onResize가 호출되는 이벤트 핸들러 등록
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return width; // useWindowWidth 훅은 창의 너비를 저장해두고, 필요할 때마다 값을 제공함
}

function WidthPrinter() {
  const width = useWindowWidth(); // 창의 너비가 변경되면 새로운 창의 너비로 렌더링됨
  return <div>{`width is ${width}`}</div>;
}

function useMounted() { // 첫 번째 렌더링 결과가 실제 돔에 반영된 후에 항상 참을 반환
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // 한번만 호출해도 충분하므로 의존성 배열은 빈 배열이 됨
  return mounted;
}