// 콘솔 로그를 추가하는 플러그인
module.exports = function({ types: t }) {
    return {
        visitor: {
            FunctionDeclaration(path) { // FunctionDeclaration 노드가 생성되면 호출되는 함수를 정의함
                if(path.node.id.name.substr(0,2) === 'on') { // 함수 이름이 on으로 시작되는지 검사함
                    path
                        .get('body')
                        .unshiftContainer( // body 배열의 앞ㅉ고에 노드를 추가하기 위해 unshiftContainer 메서드를 호출함
                            'body',
                            t.expressionStatement(
                                t.callExpression(
                                    t.memberExpression(
                                        t.identifier('console'), // 콘솔 로그를 생성함
                                        t.identifier('log'),
                                    ),
                                    [t.stringLiteral(`call ${path.node.id.name}`)], // 이 노드는 console.log(`call ${함수_이름}`); 형태의 코드를 담고 있음
                                ),
                            ),
                        )
                }
            }
        }
    }
}