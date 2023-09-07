ErrorPage.getInitialProps = ({res, err}) => { // 에러 페이지도 getInitialProps 함수를 사용할 수 있음
    const statusCode = res ? res.statusCode : err ? err.statusCode : null; // 에러 코드를 페이지 컴포넌트의 속성값으로 전달함
    return { statusCode };
};


export default function ErrorPage({statusCode}) {
    // statusCode 변수 값에 따라 다른 에러 메세지를 출력함 -> 만약 statusCode 변수 값이 존재하지 않으면 클라이언트 측에서 발생한 에러임
    return (
        <div>
            {statusCode === 404 && '페이지를 찾을 수 없습니다.'}
            {statusCode === 500 && '알 수 없는 에러가 발생했습니다.'}
            {!statusCode && '클라이언트에서 에러가 발생했습니다.'}
        </div>
    );
}