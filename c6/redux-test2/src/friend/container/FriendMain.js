import React, { useReducer, useEffect } from "react";
import store from "../../common/store"; // 이전에 작성한 스토어 객체를 가져옴
import { getNextFriend } from "../../common/mockData"; /// getNextFriend 함수를 이용하면 필요할 때마다 타임라인 데이터를 가져올 수 있음 => 서버 흉내 목적으로 만듦
import { addFriend } from "../state"; // 타임라인 데이터를 추가하기 위한 액션 새엇앚 함수를 가져옴
import FriendList from "../component/FriendList";

export default function FriendMain() {
  const [,forceUpdate] = useReducer( v => v + 1, 0);
  useEffect(() => {
    let preVFriends = store.getState().friend.friends; // 이전 상탯값을 저장하기 위한 변수 선언
    const unsubscribe = store.subscribe(() => {
      const friends = store.getState().friend.friends; // 스토어에서 타임라인 배열을 가져옴
      if(prevFrineds !== friends) { // 상탯값이 변경된 경우에만 forceUpdate 함수 호출
        forceUpdate();
      }
      preVFriends = friends;
    }); // 액션이 처리될 때마다 화면을 다시 그리기 위해 subscribe 메서드를 사용함 => 리덕스 상태가 변경되면, 무조건 컴포넌트를 렌더링하기 위해 forceUpdate 함수를 사용함
    return () => unsubscribe(); // 컴포넌트가 언마운트될 떄 subscribe 메서드에 등록한 이벤트 처리 함수를 해제함
  }, []);

  function onAdd() {
    const friend = getNextFriend();
    store.dispatch(addFriend(friend)); // 타임라인 추가 버튼을 누르면 타임라인을 추가하는 액션을 발생시킴
  }

  console.log("FriendMain render"); // 렌더링 시점을 확인

  const friends = store.getState().friend.friends; // 스토어에서 타임라인 배열을 가져옴
  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>
      <FriendList friends={friends} />
    </div>
  );
}