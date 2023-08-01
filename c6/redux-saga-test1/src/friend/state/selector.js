import { createSelector } from "reselect"; // createSelector 함수를 이용하여 선택자 함수를 만듦

const getFriends = state => state.friend.friends;
// const getAgeLimit = state => state.friend.ageLimit;
export const getAgeLimit = (_, ageLimit) => ageLimit; // 단순히 두 번째 매개변수를 이용
const getShowLimit = state => state.friend.showLimit;

// export const getFriendsWithAgeLimit = createSelector(
//   [getFriends, getAgeLimit],
//   (friends, ageLimit) => friends.filter(friend => friend.age <= ageLimit)
// );
// export const getFriendWithAgeShowLimit = createSelector(
//   [getFriendsWithAgeLimit, getShowLimit], // getFriendsWithAgeShowLimit 함수는 getFriendsWithAgeLimit 함수를 이용함 => getFriendsWithAgeLimit 함수는 friend, ageLimit가 변경될 때만 연산하고 getFriendsWithAgeShowLimit 함수는 friends, ageLimit, showLimit이 변경될 때만 연산함
//   (FriendsWithAgeLimit, showLimit) => friendsWithAgeLimit.slice(0, showLimit)
// );

export const makeGetFriendsWithAgeLimit = () => { // 선택자 함수를 생성하는 함수를 정의함 => 각 컴포넌트 인스턴스가 makeGetFriendsWithAgeLimit 함수를 호출하면 자신만의 선택자 함수를 가질 수 있음
  return createSelector([getFriends, getAgeLimit], (frineds, ageLimit) => friends.filter(friend => friend.age <= ageLimit)
  );
};