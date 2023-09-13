import React from 'react';
import { unstable_createResource } from 'react-cache'; // unstable_createResource 함수는 렌더링 과정에서 비동기 데이터를 받을 수 있도록 도와줌

function fetchUser(userId) { // 비동기로 데이터를 받는 함수임 -> 프로미스를 반환함
    return new Promise(resolve =>
        setTimeout(() => resolve({userId, name: 'mike', age: 23}), 2000),
    );
}

const UserCache = unstable_createResource(fetchUser); // unstable_createResource 함수에 프로미스를 반환하는 함수를 입력함

function Profile() {
    const user = UserCache.read(123);
    // read 메서드를 호출 했을 때 이미 받은 데이터가 있다면 그 데이터를 사용함
    // 만약 받은 데이터가 없다면 fetchUser 함수가 실행되고, fetchUser 함수가 반환하는 프로미스 객체와 함꼐 예외를 발생시킴
    // 프로미스 객체와 함께 예외가 발생하면 부모로 거슬러 올라가면서 가장 가까운 Suspence 컴포넌트를 찾음
    // Suspence 컴포넌트는 내부 영역을 fallback으로 대체하고, 추후 프로미스가 처리됨 상태가 되면 다시 렌더링함

    return (
        <div>
            <p>name: {user.name}</p>
            <p>age: {user.age}</p>
        </div>
    );
}
export default Profile;