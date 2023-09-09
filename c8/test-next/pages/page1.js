import Head from 'next/head';
// import Icon from '../static/icon.jpg';
import Link from 'next/link'
// import add from '../src/util';
import styled from 'styled-components';

const MyP = styled.div` // styled-components를 이용해서 스타일 적용된 컴포넌트를 새엇ㅇ함
  color: blue;
  font-size: 18pt;
`

function Page1() {
    // 스타일 적용 컴포넌트를 삭제
    return (
        <div>
            <MyP><p>This is Home Page</p></MyP>
            {/*<p>{`10 + 20 = ${add(10,20)}`}</p>*/}
            {/*<img src={Icon} />*/}
            <Head>
                <title>page1</title>
            </Head>
            <Head>
                <meta name="description" content="hello world" />
            </Head>
            {/*<style jsx>{`*/}
            {/*  p {*/}
            {/*    color: blue;*/}
            {/*    font-size: 18pt;*/}
            {/*  }    */}
            {/*`}</style>*/}
        </div>
    );
}

export default Page1;