import React, { useState, useEffect } from 'react';
import Home from './Home';
import About from './About';
import styled from 'styled-components';
const Container = styled.div` // styled-components를 이용하여 스타일이 적용된 컴포넌트를 만듦
    background-color: #aaaaaa;
    border: 1px solid blue;
`

// export default function App({ page }) {
export default function App( { page1 } ) {
    const [page, setPage] = useState(page1);

    useEffect(() => { // 단일 페이지 애플리케이션을 직접 구현하기 위해 onpopstate 이벤트 처리 함수를 등록함 -> 브라우저에서 뒤로 가기 버튼을 클릭하면 onpopstate 함수가 호출됨
        window.onpopstate = event => {
            setPage(event.state);
        };
    }, []);

    function onChangePage(e) { // 특정 페이지로 이동하는 버튼의 이벤트 처리 함수임
        const newPage = e.target.dataset.page;
        window.history.pushState(newPage, '', `/${newPage}`); // pushState 메서드를 통해 브라우저에게 주소가 변경됐다는 것을 알림
        setPage(newPage)
    }

    const PageComponent = page === 'home' ? Home : About; // page 상탯값에 다라 렌더링할 페이지의 컴포넌트가 결정됨

    return (
        <Container>
            <div className="container">
                <button data-page="home" onClick={onChangePage}>Home</button>
                <button data-page="about" onClick={onChangePage}>About</button>
                <PageComponent />
            </div>
        </Container>
    );
}


