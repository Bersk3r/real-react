import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Rooms from './Rooms';
function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20, border: '5px solid gray' }}>
        <Link to="/">홈</Link>
        <br />
        <Link to="/photo">사진</Link>
        <br />
        <Link to="/rooms">방</Link>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/photo" element={<Photo />} />
          {/*<Route path="/photo" component={PhotoTop} />*/}
          {/*<Route path="/photo" component={PhotoBottom} />*/}
          <Route path="rooms/*" element={<Rooms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home({match}) {
  console.log(match);
  return <h2>이 곳은 홈페이지입니다.</h2>;
}
function Photo({match}) {
  console.log(match);
  return <h2>여기서 사진을 감상하세요.</h2>;
}

export default App;
