import { callApi } from '../src/api';
import Router from 'next/router';

Page2.getInitialProps = async({query}) => { // getInitialProps 함수를 정의함 -> 매개변수로 다양한 정보가 전달되나 쿼리 파라미터 정보만 사용함
    const text = query.text || 'none'; // 쿼리 파라미터로부터 text 변수를 생성함
    const data = await callApi(); // 데이터를 가져오기 위해 API를 호출함
    const {sayHello} = await import('../src/sayHello');
    console.log(sayHello());
    return { text, data }; //
};

export default function Page2({ text, data }) { // 페이지 컴포넌트에서 반환된 값을 사용함
    // function onClick() {
    //     import('../src/sayHello').then(({sayHello}) => console.log(sayHello()));
    // }
    return (
        <div>
            <p>this is home page2</p>
            <p>{`text: ${text}`}</p>
            <p>{`data is ${data}`}</p>
            {/*<button onClick={onClick}>sayHello</button>*/}
        </div>
    );
}