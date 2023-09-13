import React, { lazy, Suspense } from 'react';
import Loading from './Loading'; // 비동기 처리가 진행 중일 때 화면에 보여줄 컴포넌트
import Profile from "./Profile";

const VideoPlayer = lazy(() => import('./VideoPlayer')); // lazy 함수를 동적 임포트와 함께 호출하면 모듈의 비동기 다운로드를 도와주는 컴포넌트가 반환됨 -> VideoPlayer 변수는 일반적인 컴포넌트처럼 사용될 수 있음, 동적 임포트가 사용되었으므로 웹팩을 사용하고 있다면 자동으로 코드가 분할됨
export default function App() {
  return (
    <div className="App">
      <h1>Suspence Example</h1> {/*Suspence 컴포넌트 내부에서 예외로 발생하는 모든 프로미스 객체가 처리됨 상태가 되기 전까지는 Loading 컴포넌트가 렌더링됨*/}
      <Suspense fallback={<Loading />}> {/*Suspence의 자식 컴포넌트에서 비동기 처리가 시작되면 Suspence 컴포넌트 내부의 모든 렌더링이 멈춤 -> 그 자리에 fallback 속성값으로 입력된 컴포넌트가 렌더링됨*/}
        <h3>watch video</h3>
        <VideoPlayer /> {/*lazy 함수로 만들어진 VideoPlayer 컴포넌트가 렌더링될 때 분할된 코드를 받음 -> 코드를 받기 전까지 Suspence 내부는 Loading 컴포넌트가 렌더링됨, 코드를 다 받으면 정상적으로 비디오 플레이어가 렌더링됨*/}
        <Profile />
      </Suspense>
    </div>
  );
}

