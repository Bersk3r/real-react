import React from "react";
import ReactDOM  from "react-dom";
import TimelineMain  from "./timeline/container/TimelineMain";
import FriendMain from "./friend/container/FriendMain";

// 직접 생성한 컨테이너 컴포넌트를 화면에 그림
ReactDOM.render(
  <div>
      <FriendMain />
      <TimelineMain />
  </div>,
  document.getElementById("root")
);

