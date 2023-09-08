import Link from 'next/Link';

export default function MyApp({ Component, pageProps }) { // Component 속성값은 현제 렌더링하려는 페이지의 컴포넌트이고, pagesProps 속성 값은 해당 페이지의 getInitialProps 함수가 반환한 값임
    return (
        <div>
            <Link href="/page1">
                <a>page1</a>
            </Link>

            <Link href="/page2">
                <a>page2</a>
            </Link>
            <Component {...pageProps} />
        </div>
    );
}