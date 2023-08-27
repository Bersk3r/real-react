/** 바벨 플러그인의 기본 구조*/
module.exports = function({ types: t}) { // types 매개변수를 가진 함수를 내보냄
    const node = t.BinaryExpression('+', t.identifier('a'), t.identifier('b')); // types 매개변수를 이용하여 AST 노드를 생성할 수 있음 => 두 변수의 덧셈을 AST 노드로 만듦
    console.log('isBinaryExpression: ', t.isBinaryExpression(node)); // types 매개변수는 AST 노드의 타입을 검사하는 용도로도 사용됨
    return {}; // 빈 객체를 반환하면 아무 일도 하지 않음
};

/**바벨 플러그인 함수가 반환하는 값의 형태*/
module.exports = function({types: t}) {
    return {
        visitor: { // visitor 객체 내부에서 노드의 타입 이름으로 된 함수를 정의할 수 있음 => 해당 하는 타입의 노드가 생성되면 같은 이름의 함수가 호출됨
            Identifier(path) { // Indetifier 타입의 노드가 생성되면 호출되는 함수임 (const v1 = a + b;가 입력되면 이 함수는 세 번 호출됨)
                console.log('Identifier name:', path.node.name);
            },
            BinaryExpression(path) { // BinaryExpression 타입의 노드가 생성되면 호출되는 함수임 (const v1 = a + b;가 입력되면 이 함수는 한 번 호출됨)
                console.log('BinaryExpression operator:', path.node.operator);
            }
        }
    }
}
