import React from 'react';

function FriendList({friends}) { // FriendList 컴포넌트는 친구 배열을 받아서 화면에 그리는 프레젠테이션 컴포넌트임
  return (
    <ul>
      {friends && friends.map(friend => (
        <li key={friend.id}>{friend.name}</li>
      ))}
    </ul>
  );
}
export default FriendList;