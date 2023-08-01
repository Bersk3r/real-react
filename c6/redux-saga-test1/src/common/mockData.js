const friends = [ // 친구 목록과 타임라인 데이터를 생성할 때 사용할 기본 데이터임
  {name: '쯔위', age: 15},
  {name: '수지', age: 20},
  {name: '아이유', age: 25},
  {name: '손나은', age: 30},
];

const timelines = [
  {desc: "점심이 맛있었다", likes: 0 },
  {desc: "나는 멋지다", likes: 10 },
  {desc: "호텔에 놀러갔다", likes: 20 },
  {desc: "비싼 핸드폰을 샀다", likes: 30 },
];

function makeDataGenerator(items) { // 친구 목록과 타임 라인을 생성하는 로직이 같으므로 하나의 함수로 작성함 => getNext~로 시작되는 함수 생성에 사용
  let itemIndex = 0;
  return function getNextData() { // getNextData는 items, itemIndex 변수를 기억하는 클로저임
    const item = items[itemIndex % items.length];
    itemIndex += 1;
    return {... item, id: itemIndex}; // getNextData 함수는 중복되지 않는 id 값을 넣어서 반환함
  };
}

export const getNextFriend = makeDataGenerator(friends);
export const getNextTimeline = makeDataGenerator(timelines);