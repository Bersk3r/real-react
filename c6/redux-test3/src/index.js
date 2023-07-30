import React from "react";
import ReactDOM  from "react-dom";
import TimelineMain  from "./timeline/container/TimelineMain";
import FriendMain from "./friend/container/FriendMain";
import store from "./common/store";
import { Provider } from "react-redux";
// 스토어 객체를 Provider 컴포넌트의 속성값으로 넣음 => Provider 컴포넌트는 전달받은 스토어 객체의 subscribe 메서드를 호출하여 액션 처리가 끝날 때마다 알림을 받음
// 그 다음, 컨텍스트 API를 사용하여 리덕스의 상탯값을 하위 컴포넌트로 전달
ReactDOM.render(
  <Provider store={store}>
    <div>
      <FriendMain />
      <TimelineMain />
    </div>
  </Provider>,
  document.getElementById("root")
);

