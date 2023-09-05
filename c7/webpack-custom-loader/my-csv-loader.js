module.exports = function(source) { // 로더는 모듈의 내용을 문자열로 입력받는 함수임
    const result = { header: undefined, rows: [] };  // 모듈을 사용하는 쪽에서 받게 될 데이터임
    const rows = source.split('\n'); // 문자열로 입력된 CSV 모듈의 내용을 파싱하여 result 객체에 저장함
    console.log(rows);
    for (const row of rows) {
        const cols = row.split(',');
        if(!result.header) {
            result.header = cols;
        } else {
            result.rows.push(cols);
        }
    }
    console.log(result);
    // result 객체의 내용이 담긴 자바스크립트 코드를 반환함
    return `export default ${JSON.stringify(result)}`;
}