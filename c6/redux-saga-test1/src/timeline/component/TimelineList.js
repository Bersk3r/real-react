import React from 'react';

function TimelineList({timelines, onLike}) { // 좋아요 버튼에 반응ㅇ하는 이벤트 처리 함수를 속성값으로 받음
  // 좋아요 버튼을 추가함 => 이벤트 처리 함수에 타임 라인 객체의 id 정보를 넘기기 위해 dataset(데이터셋)을 이용함
  return (
    <ul>
      {timelines.map(({ id, desc, likes}) => (
        <li keys={id}>
          {desc}
          <button data-id={id} onClick={onLike}>{`좋아요(${likes})`}</button>
        </li>
      ))}
    </ul>
  );
}
export default TimelineList;