// 컴포넌트 파일 내 작성 순서
MyComponent.propTypes = {
  // ...
};

export default function MyComponent({props1, props2}) {
  // ...
}

const COLUMNES = [
  {id: 1, name: 'PhoneNumber', width: 200, color: 'white'},
  {id: 1, name: 'city', width: 100, color: 'grey'},
  // ...
];

const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({price, total}) {
  // ...
}

// 서로 연관된 코드를 한 곳으로 모으기 (이전)
function Profile({userId}) {
  const [user, setUser] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  // ...
}

// 서로 연관된 코드를 한 곳으로 모으기 (이후 1)
function Profile({userId}) {
  const [user, setUser] = useState(null);  // 사용자 정보를 가져오는 기능을 한 곳으로 모음
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);
  const [width, setWidth] = useState(window.innerWidth); // 창의 너비를 가져오는 기능을 한 곳으로 모음
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  // ...
}

// 서로 연관된 코드를 한 곳으로 모으기 (이후 2, 커스텀 훅)
function Profile({userId}) {
  const user = useUser(userId);  // 사용자 정보를 가져오는 기능을 한 곳으로 모음
  const width = useWindowWidth(); // 창의 너비를 가져오는 기능을 한 곳으로 모음
  // ...
}

function useUser(userId) {
  const [user, setUser] = useState(null);  // 사용자 정보를 가져오는 기능을 한 곳으로 모음
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);
  return user;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth); // 창의 너비를 가져오는 기능을 한 곳으로 모음
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return width;
}