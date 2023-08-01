import React, {useReducer, useEffect, useState} from "react";
import store from "../../common/store"; // 이전에 작성한 스토어 객체를 가져옴
import { getNextTimeline } from "../../common/mockData"; /// getNextTimeline 함수를 이용하면 필요할 때마다 타임라인 데이터를 가져올 수 있음 => 서버 흉내 목적으로 만듦
import { addTimeline } from "../state"; // 타임라인 데이터를 추가하기 위한 액션 새엇앚 함수를 가져옴
import TimelineList from "../component/TimelineList";
import {actions} from '../state';
import {useDispatch, useSelector} from "react-redux";

export default function TimelineMain() {
  const dispatch = useDispatch();
  const timelines = useSelector(state => state.timeline.timelines);
  const isLoading = useSelector(state => state.timeline.isLoading);
  const error = useSelector(state => state.timeline.error); // 리덕스 상탯값으로부터 에러 값을 가져옴
  const text= useSelector(state => state.timeline.text);
  const [currentText, setCurrentText] = useState(""); // 현재 입력중인 문자영을 컴포넌트의 상탯값에 저장함
  const [,forceUpdate] = useReducer( v => v + 1, 0);
  console.log("TimelineMain render"); // 렌더링 시점을 확인

  function onChangeText(e) {
    const text = e.target.value;
    dispatch(actions.trySetText(text)); // 문자열을 입력할 때마다 TRY_SET_TEXT 액션을 발생시킴
    setCurrentText(text);
  }
  function onAdd() {
    const timeline = getNextTimeline();
    dispatch(actions.addTimeline(timeline)); // 리덕스 상탯값에서 로딩 정보를 가져옴
  }
  function onLike(e) { // 좋아요 버튼에 반응하는 이벤트 처리 함수 작성
    const id = Number(e.target.dataset.id);
    const timeline = timelines.find(item => item.id === id);
    dispatch(actions.requestLike(timeline)); // REQUEST_LIKE 액션을 발생함
  }

  // 로딩 중일 때 화면에 텍스트 정보를 출력함
  // 에러가 발생하면 화면에 출력함
  // 리덕스에서 저장된 text를 입력창 아래쪽에 출곃마
  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} onLike={onLike} />
      {!!isLoading && <p>전송 중 ...</p>}
      {!!error && <p>에러 발생: {error}</p>}
      <input type="text" value={currentText} onChange={onChangeText} />
      {!!text && <p>{text}</p>}
    </div>
  );
}