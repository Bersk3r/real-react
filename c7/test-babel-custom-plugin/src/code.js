/**콘솔 로그를 포함하는 code.js 파일*/
// 콘솔 로그 제거 플러그인을 제작하기 위해선 AST 구조를 이해해야 함
console.log('aaa');
const v1 = 123;
console.log('bbb');
function onClick(e) {
    const v = e.target.value;
}
function add(a,b) {
    return a + b;
}

// type: "Program"
// start: 0
// end: 20
// body:  [
// ]
// -
// ExpressionStatement { // 콘솔 로그 코드는 ExpressionStatement 노드로 시작함
// }
// -
//     type: "ExpressionStatement"
// start: 0
// end: 20
// expression: CallExpression {
// }
// -
//     type: "CallExpression"
// start: 0
// end: 19
// callee: MemberExpression {
// }
// -
//     type: "MemberExpression"
// start: 0
// end: 11
// + object: Identifier {type, s
//     property: Identifier = $nod
// }
// -
//     type: "Identifier"
// start: 8
// end: 11
// name: "log"
// computed: false
// optional: false
// arguments:  [
// ]
// -
// + Literal {type, start, end,
//     optional: false
//     sourceType: "module"
//

/** 함수 내부에 콘솔 로그 추가 */
// AST 구조
// Program {
// }
// -
//     type: "Program"
// start: 0
// end: 27
// body:  [
// ]
// -
// FunctionDeclaration {
// }
// -
//     type: "FunctionDeclaration"
// start: 0
// end: 27
// + id: Identifier {type, start, end, nam
//     expression: false
//     generator: false
//     async: false
//     + params: [1 element]
//     body: BlockStatement {
//     }
//     -
//         type: "BlockStatement"
//     start: 16
//     end: 27
//     body:  [
//     ]
//     -
//     VariableDeclaration {type, st
//         declarations, kind}
//     +
//         sourceType: "module"
// }