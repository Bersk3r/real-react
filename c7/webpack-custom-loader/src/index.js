/**CSV 모듈을 사용하는 코드*/
import members from './member.csv';

for (const row of members.rows) {
    const name = row[1];
    const age = row[2];
    console.log(`${name} is ${age} years old`);
}