/** 콘솔 로그를 제거하는 플러그인 코드 */
module.exports = function({ types: t }) {
    return {
        visitor: {
            ExpressionStatement(path) { // ExpressionStatement 노드가 생성되면 호출되도록 메서드를 등록함
                if(t.isCallExpression(path.node.expression)) { // ExpressionStatement 노드의 expression 속성이 CallExpression 노드인지 ㄱ머사함
                    if(t.isMemberExpression(path.node.expression.callee)) { // callee 속성이 MemberExpression 노드인지 ㄱ머사함
                        const memberExp = path.node.expression.callee; 
                        if(
                            memberExp.object.name === 'console' && // console 객체의 log 메서드가 호출된 것인지 검사함
                            memberExp.property.name === 'log'
                        ) {
                            path.remove(); // 모든 조건을 만족하면 AST에서 ExpressionStatement 노드를 제거함
                        }
                    }
                }
            }
        }
    }
}