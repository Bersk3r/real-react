/**함수형 컴포넌트의 타입 정의하기*/
// import React from "react";
//
// interface Props { // 속성 값의 타입을 정의함 -> 속성 값의 타입 정보는 문서의 역할을 하므로 파일의 최상단에서 정의하는 게 좋음, 물음표 기호를 이용하여 선택 속성을 정의함
//     name: string;
//     age?: number;
// }
//
// export default function MyComponent({name, age = 23}: Props) { // Props 타입을 이용해서 속성값의 타입을 입력함, 컴포넌트 속성값의 기본값은 자바스크립트 표준 문법을 이용하면 됨
//     return (
//         <div>
//             <p>{name}</p>
//             <p>{age.substr(0)}</p>
//             {/* 타입 에러 발생, 타입스크립트 age가 숫자라는 걸 알기 때문에 substr 메서드를 호출하면 타입 에러가 발생함, MyComponent 컴포넌트를 사용하는 곳에서는 name 속성을 반드시 입력해야 하며, age 속성은 입력하지 않아도 됨 -> 단 name, age 외의 속성을 입력하려고 하면 에러가 발생함*/}
//         </div>
//     );
// }
//
// const MyComponent: React.FunctionComponent<Props> = function({name, age = 23}) { // Props 타입을 이용해서 속성값의 타입을 입력함, 컴포넌트 속성값의 기본값은 자바스크립트 표준 문법을 이용하면 됨
//     return (
//         <div>
//             <p>{name}</p>
//             <p>{age.substr(0)}</p>
//             {/* 타입 에러 발생, 타입스크립트 age가 숫자라는 걸 알기 때문에 substr 메서드를 호출하면 타입 에러가 발생함, MyComponent 컴포넌트를 사용하는 곳에서는 name 속성을 반드시 입력해야 하며, age 속성은 입력하지 않아도 됨 -> 단 name, age 외의 속성을 입력하려고 하면 에러가 발생함*/}
//         </div>
//     )
// }

import React, { createRef } from 'react';

interface Props { // 클래스형 컴포넌트에서도 속성 값의 타입을 파일의 최상단에 작성함
    containerStyle: React.CSSProperties; // 리액트에서 돔 요소에 입력하는 스타일 객체의 타입은 React.CSSProperties를 사용함
    theme: string;
}

const defaultProps = {
    theme: 'dark', // theme은 기본값이 있는 속성값임 -> 앞에서 Props 인터페이스의 theme 속성에 물음표 기호를 넣지 않음
}

interface State { // 속성값의 타입을 정의하고 그 밑에 상탯값의 타입을 정의함
    name: string;
    age?: number;
}

class MyComponent extends React.Component<Props, State> { // 속성값과 상탯값의 타입을 React.Component의 제네릭으로 입력함 -> 두 번째 제네릭으로 입력한 State 타입은 setState 메서드의 타입 정의에 사용됨
    state: State = { // 초기 상탯값을 정의함, State 타입을 두 번 입력하는 게 조금 어색할 수 있으나, this.state의 타입을 정의하기 위해 반드시 필요한 과정임
        name: 'mike',
    };
    static defaultProps = defaultProps; // defaultProps를 입력함으로써 컴포넌트를 사용할 때 theme 타입은 선택 속성이 됨 -> 컴포넌트는 사용하는 사람이 선택 속성을 쉽게 알 수 있도록 defaultProps 변수는 Props 타입 정의 바로 밑에 작성하는 게 좋음
    pRef = createRef<HTMLParagraphElement>(); // createRef 함수에 입력한 제네릭 타입은 pRef 변수를 사용할 때 도움이 되므로 정확한 타입을 입력하는 게 좋음
    onClick1 = (e: EventObject) => { // 이전에 정의한 EventObject 타입을 이용하면 모든 이벤트 객체에 currentTarget 속성이 있기 때문에 EventObject 타입으로도 충분함
        console.log(e.currentTarget.dataset.food);
    }
    onClick2 = (e: React.MouseEvent<HTMLButtonElement>) => { // 버튼 이벤트 객체에만 존재하는 속성을 이용하려면 정확한 타입을 입력해야 함
        console.log(`${e.clientX}, ${e.clientY}`);
    };
    render() {
        const { containerStyle, theme } = this.props;
        const { name, age } = this.state;
        return (
            <div style={containerStyle}>
                <p ref={this.pRef}>{name}</p>
                <p>{`${name} ${age}`}</p>
                <p>{`theme is ${theme.substr(1)}`}</p>
                <button data-foold="soup" onclick={this.onClick1}>버튼1</button>
                <button onclick={this.onClick2}>버튼2</button>
            </div>
        );
    }
}