import React, { useReducer, useEffect } from "react";
import store from "../../common/store"; // 이전에 작성한 스토어 객체를 가져옴
import { getNextFriend } from "../../common/mockData"; /// getNextFriend 함수를 이용하면 필요할 때마다 타임라인 데이터를 가져올 수 있음 => 서버 흉내 목적으로 만듦
import { addFriend } from "../state"; // 타임라인 데이터를 추가하기 위한 액션 새엇앚 함수를 가져옴
import FriendList from "../component/FriendList";
import {useSelector, useDispatch } from "react-redux";

export default function FriendMain() {
  const friends = useSelector(state => state.friend.friends);
  const dispatch = useDispatch(); // 액션 발생

  function onAdd() {
    const friend = getNextFriend();
    dispatch(addFriend(friend)); // dispatch 함수를 이용하여 친구를 축하는 액션을 발생시킴
  }

  console.log("FriendMain render");

  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>
      <FriendList friends={friends}/>
    </div>
  );
}