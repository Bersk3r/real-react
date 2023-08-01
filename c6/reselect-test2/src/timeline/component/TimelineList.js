import React from 'react';

function TimelineList({timelines}) { // 해당 컴포넌트는 타임 라인 배열을 받아서 화면에서 그리는 프레젠테이션 컴포넌트임
  return (
    <ul>
      {timelines && timelines.map(timeline => (
        <li key={timeline.id}>{timeline.desc}</li>
      ))}
    </ul>
  );
}
export default TimelineList;