/**타입스크립트에서 타입 정보 입력하기*/
// let v1: number | string = 123;
// v1 = 'abc';

/**타입스크립트에서 사용되는 다양한 타입의 예*/

// const size: number = 123;
// const isBig: boolean = size >= 100;
// const msg: string = isBig ? '크다':'작다';
//
// const values: number[] = [1,2,3]; // 배열은 두 타입으로 정의 가능
// const values2: Array<Number> = [1,2,3];  // 배열은 두 타입으로 정의 가능
//
// values.push('a'); // 타입 에러 발생, 숫자 배열에 문자열을 입력하면 타입 에러가 발생함
// const data: [string, number] = [msg, size]; // 문자열과 숫자로 구성된 튜플 타입을 정의함
// data[0].substr(1);
// data[1].substr(1); // 타입 에러, 두 번째 아이템의 타입은 숫자인데 문자열의 메서드를 호출하면 타입 에러가 발생

/**타입으로 사용될 수 있는 null과 undefined*/
// let v1: undefined = undefined; // undefined와 null은 타입으로 사용될 수 있음
// let v2: null = null;
// v1 = 123; // 타입 에러, undefined 타입에 숫자를 입력하면 타입 에러가 발생됨
//
// let v3: number | undefined = undefined; // undefined와 null 타입은 다른 타입과 함꼐 유니온 타입으로 정의할 때 많이 사용됨
// v3 = 123;

/**타입으로 사용되는 숫자 리터럴과 문자열 리터럴*/
// let v1: 10 | 20 | 30; // 각각 타입으로 사용됨 -> v1은 오직 10,20,30만 가질 수 있음
// v1 = 10;
// v1 = 15; // 10,20,30 외에 다른 숫자는 입력될 수 없음
//
// let v2: '경찰관' | '소방관'; // 문자열 리터럴 타입으로 정의함
// v2 = '의사';

/**any 타입의 예시*/
// let value: any;
// value = 123;
// value = '456';
// value = () => {};

/**void와 never 타입*/
// function f1(): void { // 아무 값도 반환하지 않으므로 void 타입으로 정의
//     console.log('hello');
// }
// function f2(): never { // 함수가 항상 비정상적으로 종료되므로 never 타입으로 정의
//     throw new Error('some error');
// }
// function f3(): never { // 함수가 종료되지 않으므로 never 타입으로 정의
//     while(true) {
//         // ...
//     }
// }

/**object 타입*/
// let v: object;
// v = { name: 'abc'};
// console.log(v.prop1); // 타입 에러 -> 속성 값이 존재하지 않으므로

/**교차 타입과 유니온 타입*/
// let v1: (1|3|5) & (3|5|7); // 3 | 5와 동일함
// v1 = 3;
// v1 = 1; // 타입 에러, 3이나 5 외의 값을 할당할 수 없음

/**type 키워드로 타입에 별칭 추가*/
// type Width = number | string; // Width에 number | string이라는 별칭을 부여
// let width: Width; // Width는 일반적인 타입처럼 사용가능함
// width = 100;
// width = '100px';

/**열거형 타입*/
// enum Fruit { // 열거형 타입을 이용한 과일 정의
//     Apple,
//     Banana,
//     Orange,
// }
// const v1: Fruit = Fruit.Apple; // 열거형 타입 원소를 값으로 사용
// const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana; // 열거형 타입 원소를 타입으로 사용

/**명시적으로 원소의 값 입력하기*/
// enum Fruit {
//     Apple,
//     Banana = 5,
//     Orange,
// }
//
// console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);

/**열거형 타입이 컴파일된 결과*/
// var Fruit;
// (function(Fruit) {
//     Fruit[(Fruit['Apple'] = 0)] = 'Apple'; // 열거
//     Fruit[(Fruit['Banana'] = 5)] = 'Banana';
//     Fruit[(Fruit['Orange'] = 6)] = 'Orange';
// }) (Fruit || (Fruit = {}));
// console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);

/**열거형 타입의 객체 사용하기*/
// enum Fruit {
//     Apple,
//     Banana = 5,
//     Orange,
// }
//
// console.log(Fruit.Banana); // 5
// console.log(Fruit['Banana']); // 5
// console.log(Fruit[5]); // Banana

/**열거형 타입의 값으로 문자열 할당하기*/
// enum Language {
//     Korean = 'ko',
//     English = 'en',
//     Japanese = 'jp',
// }

/**열거형 타입에 문자열을 할당했을 때 컴파일된 결과*/
// var Language;
// (function(Language) {
//     Language['Korean'] = 'ko';
//     Language['English'] = 'en';
//     Language['Japanese'] = 'jp';
// }) (Language || (Language = {}));

/**열거형 타입의 원소 개수를 알려 주는 함수*/
function getEnumLength(enumObject: any) {
    const keys = Object.keys(enumObject);
    // enum 값이 숫자이면 두 개씩 들어가므로 문자열만 계산함
    return keys.reduce(
        (acc, key) => (typeof enumObject[key] === 'string' ? acc + 1 : acc),
        0,
    );
}

/**열거형 타입에 존재하는 값인지 검사하는 함수*/
function isValidEnumValue(enumObject: any, value: number | string) {
    if(typeof value === 'number') { // 값이 숫자이면 양방향으로 매핑됬는지 검사함
        return !!enumObject[value];
    } else {
        return (
            Object.keys(enumObject)
                .filter(key => isNaN(Number(key)))
                .some(key => enumObject[key] === value) // 값이 문자열이면 양방향 매핑에 의해 생성된 키를 제거하고 해당 값이 존재하는 지 검사함
        );
    }
}

/**getEnumLength 함수와 isValidEnumValue 함수 사용 예*/
enum Fruit {
    Apple,
    Banana,
    Orange,
}
enum Language {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}

console.log(getEnumLength(Fruit), getEnumLength(Language)); // 3 3 -> 원소 갯수 출력
console.log('1 in Fruit', isValidEnumValue(Fruit, 1)); // true
console.log('5 in Fruit', isValidEnumValue(Fruit, 5)); // false
console.log('ko in Language',isValidEnumValue(Language, 'ko')); // true
console.log('Korean in Language',isValidEnumValue(Language, 'Korean')); // false -> 열거형 타입에 존재하는 값이 맞는 지 검사, isValidEnumValue 함수는 서버로부터 받은 데이터를 검증할 때 유용하게 사용할 수 있음

/**상수 열거형 타입*/
// 두 열거형을 상수로 정의
const enum Fruit {
    Apple,
    Banana,
    Orange,
}
const fruit: Fruit = Fruit.Apple;

const enum Language {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}
const lang: Language = Language.Korean;

/** 상수 열거형 타입이 컴파일된 결과*/
const fruit = 0;
const lang = 'ko';

/**상수 열거형 타입의 객체는 사용할 수 없다*/
const enum Fruit {
    Apple,
    Banana,
    Orange,
}

console.log(getEnumLength(Fruit)); // 타입 에러, 컴파일 타임에 에러를 확인할 수 있음

/**함수의 타입 정의하기*/
function getInfoText(name: string, age: number): string { // 매개변수 타입과 반환 타입을 정의함
    const nameText = name.substr(0,10); // 매개변수 name은 문자열 타입이므로 substr 메서드를 사용할 수 있음 -> 문자열 타입이 아니면 타입 에러가 발생함
    const ageText = age >= 35 ? 'senior' : 'junior'; // 매개변수 age는 숫자이기 때문에 다른 숫자와 크기 비교를 할 수 있음
    return `name: ${nameText}, age: ${ageText}`;
}
const v1: string = getInfoText('mike', 23);
const v2: string = getInfoText('mike', '23'); // 타입 에러, 문자열 age에 문자열을 입력하면 타입 에러가 발생함
const v3: number = getInfoText('mike', 23); // 타입 에러, 숫자 타입인 v3 변수에 이 함수의 반환값을 넣으면 타입 에러가 발생함

/**변수를 함수 타입으로 정의하기*/
const getinfoText: (name: string, age: number) => string = function (name, age)
{ // 함수를 구현하는 코드에서는 매개변수 타입과 반환 타입을 작성하지 않아도 됨 -> 타입스크립트는 오른쪽 코드에서 각각의 타입을 파악하고 있음
    //...
};

/**선택 매개변수*/
function getInfoText(name: string, age: number, language?: string): string { // language를 선택 매개변수로 정의함
    const nameText = name.substr; //
    const ageText = age >= 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10): ''; // 인수의 존재 여부를 검사하지 않고, substr 메서드를 호출하면 타입 에러가 발생함
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
getInfoText('mike', 23, 'ko');
getInfoText('mike', 23); // language에 해당하는 인수는 입력하지 않아도 됨
getinfoText('mike', 23, 123); // 타입 에러, 반드시 정의된 타입을 만족하는 값을 입력해야 함

/**선택 매개변수 오른쪽에 필수 매개변수를 정의한 코드*/
function getInfoText(name: string, language?: string, age: number): string {
    //...
}

/** undefined를 이용해서 중간에 선택 매개변수를 정의하기*/
function getInfoText(
    name: string,
    language: string | undefined,
    age: number,
): string {
    // ...
}
getInfoText('mike', undefined, 23);

/**매개변수의 기본값 정의하기*/
function getInfoText(
    name: string,
    age: number = 15, // 타입 오른쪽에 = 기호를 사용해서 매개변수의 기본값을 정의할 수 있음
    language = 'korean',
): string {
    // ...
}

console.log(getInfoText('mike'));
console.log(getInfoText('mike', 23));
console.log(getInfoText('jone', 36, 'english'));

const f1: (
    name: string,
    age?: number,
    language?: string,
) => string = getInfoText;

/**나머지 매개변수*/
function getInfoText(name: string, ...rest: string[]): string {
    // ...
}

/**this 타입을 정의하지 않은 코드*/
function getParam(index: number): string {
    const params = this.splt(','); // this 타입이 any가 되면 컴파일 에러가 발생하지 않음
    if(index < 0 || params.length <= index) {
        return '';
    }
    return this.split(',')[index];
}

/**this 타입을 정의한 코드*/
function getParam(this: string, index: number): string { // 매개변수 index는 두 번째 자리에 정의됨 -> 하지만 this 타입은 매개변수가 아니므로 index가 첫 번째 매개변수가 됨
    const params = this.splt(',') // 타입 에러, this의 타입이 정의되어 오타에 대한 타입 에러가 발생
}

/**문자열 타입에 메서드 추가하기*/
interface String { // 인터페이스를 이용해서 이미 존재하는 문자열 타입에 getParam 메서드를 추가함
    getParam(this: string, index: number): string;
}
String.prototype.getParam = getParam; // 문자열의 프로토타입에 우리가 작성한 함수를 등록함
console.log('asdf, 1234, ok'.getParam(1)); // 문자열에 등록한 getParam 메서드를 사용할 수 있음

/**함수 오버로드를 사용하지 않은 코드*/
// 두 매개변수가 모두 문자열이면 문자열을 반환함
// 두 매개변수가 모두 숫자이면 숫자를 반환함
// 두 매개변수를 서로 다른 타입으로 입력하면 안 됨
function add(x: number | string, y: number | string): number | string { // 모든 매개변수의 반환값의 타입은 문자열이거나 숫자임
    if(typeof x === 'number' && typeof y === 'number') {
        return x + y;
    } else {
        const result = Number(x) + Number(y);
        return result.toString();
    }
}
const v1: number = add(1,2); // 타입 에러, 모든 매개변수가 숫자이면 반환값도 숫자이지만 타입 에러가 발생함
console.log(add(1,'2')); // 두 매개변수의 타입이 달라도 타입 에러가 발생하지 않음 -> 함수 타입이 구체적으로 정의되지 않았기 때문임

/**함수 오버로드를 사용한 코드*/
// 두 매개변수가 모두 문자열이면 문자열을 반환함
// 두 매개변수가 모두 숫자이면 숫자를 반환함
// 두 매개변수를 서로 다른 타입으로 입력하면 안 됨
function add(x: number, y: number): number;
function add(x: string, y: string): string; //매개변수와 반환 타입의 모든 가능한 조합을 정의함
function add(x: number | string, y: number | string): number | string { // 실제 구현하는 족에서 정의한 타입은 함수 오버로드의 타입 목록에서 제외됨
    // ...
}
const v1: number = add(1,2); // 두 매개변수의 타입이 숫자이면 반환 타입도 숫자이므로 타입 에러가 발생하지 않음
console.log(add(1,'2')) // 타입 에러, 두 매개변수의 타입이 다르면 타입 에러가 발생함

/**명명된 매개변수를 사용하기*/
function getInfoText({
    name, // 우선 모든 매개변수의 이름을 정의함 -> 기본값이 있다면 여기서 같이 정의함
    age = 15,
    language,
}: {
    name: string; // 앞에 나열된 모든 매개변수에 대한 타입을 정의함
    age?: number;
    language?: string;
}): string {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}

/**인터페이스로 명명된 매개변수의 타입 정의하기*/
interface Param {
    name: string;
    age?: number;
    language?: string;
}
function getInfoText({name, age = 15, language}: Param): string {
    // ...
}