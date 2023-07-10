import React from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';

function Rooms() {
  return (
    <div>
      <h2>여기는 방을 소개하는 페이지입니다.</h2>
      <Link to="blueRoom">파란 방입니다</Link>
      <br />
      <Link to="greenRoom">초록 방입니다</Link>
      <br />
      <Routes>
        <Route path=":roomId" element={<Room />} />
        <Route
          exact
          path=""
          render={() => <h3>방을 선택해주세요.</h3> }
          />
      </Routes>
    </div>
  );
}
export default Rooms;

function Room() {
  let {roomId} = useParams();
  return <h2>{`${roomId} 방을 선택하셨습니다.`}</h2>;
}