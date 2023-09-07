import React from 'react';

function Home({ username }) {
    return (
        <div>
            <h3>This is Home Page</h3>
            {username && <p>{`${username}님 안녕하세요`}</p>}
        </div>
    );
}
export default Home;