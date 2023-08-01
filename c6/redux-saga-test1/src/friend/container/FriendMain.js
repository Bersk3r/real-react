import { getNextFriend } from "../../common/mockData"; /// getNextFriend 함수를 이용하면 필요할 때마다 타임라인 데이터를 가져올 수 있음 => 서버 흉내 목적으로 만듦
import { addFriend } from "../state"; // 타임라인 데이터를 추가하기 위한 액션 새엇앚 함수를 가져옴
import FriendList from "../component/FriendList";
import {useSelector, useDispatch, shallowEqual } from "react-redux";
import NumberSelect from "../component/NumberSelect";
import {MAX_AGE_LIMIT, MAX_SHOW_LIMIT} from "../common";
import {getFriendsWithAgeLimit, getFriendWithAgeShowLimit, makeGetFriendsWithAgeLimit} from "../state/selector";

// export default function FriendMain() {
//   // const [
//   //   ageLimit,
//   //   showLimit,
//   //   friendsWithAgeLimit,
//   //   friendsWithAgeShowLimit,
//   // ] = useSelector(state => [
//   //   getAgeLimit(state),
//   //   getShowLimit(state),
//   //   getFriendsWithAgeLimit(state),
//   //   getFriendWithAgeShowLimit(state),
//   // ],
//   //   shallowEqual
//   // );
//   const ageLimit = useSelector(getAgeLimit);
//   const showLimit = useSelector(getShowLimit);
//   const friendsWithAgeLimit = useSelector(getFriendsWithAgeLimit);
//   const friendsWithAgeShowLimit = useSelector(getFriendsWithAgeShowLimit);
//
//   const dispatch = useDispatch(); // 액션 발생
//
//   function onAdd() {
//     const friend = getNextFriend();
//     dispatch(actions.addFriend(friend)); // dispatch 함수를 이용하여 친구를 축하는 액션을 발생시킴
//   }
//
//   // 연령 제한 옵션을 보여주며, 연령 제한 옵션을 선택하면 setAgeLimit 액션이 생성되고, 리덕스의 상탯값이 변경됨
//   // 연령 제한으로 필터링된 친구들의 목록을 보여줌
//   // 연령 제한과 개수 제한이 모두 적용된 친구 목록을 보여줌
//   // 연령 제한과 갯수 제한을 위한 옵션 목록임
//   return (
//     <div>
//       <button onClick={onAdd}>친구 추가</button>
//       <NumberSelect
//         onChange={v => dispatch(actions.setAgeLimit(v))}
//         value={ageLimit}
//         options={AGE_LIMIT_OPTIONS}
//         postfix="세 이하만 보기"
//       />
//       <FriendList friends={friendsWithAgeLimit} />
//       <NumberSelect
//         onChange={v => dispatch(actions.setShowLimit(v))}
//         value={showLimit}
//         options={SHOW_LIMIT_OPTIONS}
//         postfix="명 이하만 보기 (연령 제한 적용)"
//       />
//       <FriendList friends={friendsWithAgeShowLimit} />
//     </div>
//   );
// }
//
// const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
// const SHOW_LIMIT_OPTIONS = [15, 20, 25, MAX_SHOW_LIMIT];
// export default function FriendMain({ageLimit}) { // ageLimit을 속성값으로 받음
//   const showLimit = useSelector(getShowLimit);
//   const friendsWithAgeLimit = useSelector(state => getFriendsWithAgeLimit(state,ageLimit)); // 선택자 함수의 인수로 상탯값과 속성값을 모두 넘김
//   const friendsWithAgeShowLimit = useSelector(getFriendsWithAgeShowLimit);
//
//   const dispatch = useDispatch(); // 액션 발생
//
//   function onAdd() {
//     const friend = getNextFriend();
//     dispatch(actions.addFriend(friend)); // dispatch 함수를 이용하여 친구를 축하는 액션을 발생시킴
//   }
//
//   // 연령 제한 옵션을 보여주며, 연령 제한 옵션을 선택하면 setAgeLimit 액션이 생성되고, 리덕스의 상탯값이 변경됨
//   // 연령 제한으로 필터링된 친구들의 목록을 보여줌
//   // 연령 제한과 개수 제한이 모두 적용된 친구 목록을 보여줌
//   // 연령 제한과 갯수 제한을 위한 옵션 목록임
//   return (
//     <div>
//       <button onClick={onAdd}>친구 추가</button>
//       <FriendList friends={friendsWithAgeLimit} />
//       <FriendList friends={friendsWithAgeShowLimit} />
//     </div>
//   );
// }
export default function FriendMain({ageLimit}) { // ageLimit을 속성값으로 받음
  const getFriendsWithAgeLimit = useMemo(makeGetFriendsWithAgeLimit, []); // makeGetFriendsWithAgeLimit 함수를 이용하여 getFriendsWithAgeLimit 함수를 생성 => 이 때 useMemo 훅을 이용하여 getFriendsWithAgeLimit 함수의 참조 값이 변경되지 않도록 함 (결과적으로 각 컴포넌트 인스트너스는 각자의 getFriendsWithAgeLimit 함수를 갖는 셈)
  const friendsWithAgeLimit = useSelector(state =>
    getFriendWithAgeLimit(state, ageLimit)
  );
  const dispatch = useDispatch(); // 액션 발생

  function onAdd() {
    const friend = getNextFriend();
    dispatch(actions.addFriend(friend)); // dispatch 함수를 이용하여 친구를 축하는 액션을 발생시킴
  }

  // 연령 제한 옵션을 보여주며, 연령 제한 옵션을 선택하면 setAgeLimit 액션이 생성되고, 리덕스의 상탯값이 변경됨
  // 연령 제한으로 필터링된 친구들의 목록을 보여줌
  // 연령 제한과 개수 제한이 모두 적용된 친구 목록을 보여줌
  // 연령 제한과 갯수 제한을 위한 옵션 목록임
  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>
      <FriendList friends={friendsWithAgeLimit} />
      <FriendList friends={friendsWithAgeShowLimit} />
    </div>
  );
}
