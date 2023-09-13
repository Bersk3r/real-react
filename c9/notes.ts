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

/**인터페이스의 간단한 예*/
// interface Person { // Person 인터페이스 정의
//     name: string; // 객체 내부 각 속성의 타입을 정의
//     age: number;
// }
//
// const p1: Person = { name: 'mike', age: 23 };
// const p2: Person = { name: 'mike', age: 'ten' }; // 타입 에러 발생, 하나의 속성이라도 만족 못 하면 에러 발생

/**인터페이스에서 선택 속성 정의하기*/
// interface Person { // Person 인터페이스 정의
//     name: string; // 객체 내부 각 속성의 타입을 정의
//     age?: number;
// }
//
// const p1: Person = { name: 'mike'};

/**undefined가 유니온 타입에 포함된 경우*/
// interface Person {
//     name: string;
//     age: number | undefined;
// }
//
// const p1: Person = { name: 'mike' }; // 타입 에러 발생, 선택 속성과 달리 명시적으로 age 속성을 입력해야 함
// const p2: Person = { name: 'mike', age: undefined };

/**읽기 전용 속성*/
// interface Person {
//     readonly name: string;
//     age?: number;
// }
// const p1 : Person = {
//     name: 'mike', // 변수 정의 시점에는 값 할당이 가능함
// };
// p1.name = 'jone'; // 컴파일 에러, 읽기 전용 속성의 값을 수정하려고 하면 에러 발생

/**정의되지 않은 속성값을 할당하는 경우*/
// interface Person {
//     readonly name: string;
//     age?: number;
// }
// const p1: Person = {
//     name: 'mike',
//     birthday: '1997-01-01', // 타입 에러 발생, Person 인터페이스에 정의되지 않은 속성을 리터럴로 입력하면 타입 에러가 발생 -> 리터럴에서 에러가 발생하는 건 개발자의 실수일 확률이 높으며, 타입스크립트의 편의 기능임
// };
// const p2 = {
//     name: 'mike',
//     birthday: '1997-01-01', // p2 객체에는 Person 인터페이스에서 정의되지 않은 속성이 있음
// };
// const p3: Person = p2; // p2가 Person에 정의되지 않은 속성을 포함하나 타입 에러가 발생하지 않음, p3 타입이 p2의 타입을 포함하는 더 큰 타입이므로

/**인덱스 타입의 예*/
// interface Person {
//     readonly name: string;
//     age: number;
//     [key:string]: string | number; // 문자열로 된 모든 속성 이름에 대해 값이 문자열 또는 숫자라고 정의
// }
// const p1: Person = {
//     name: 'mike',
//     birthday: '1997-01-01', // 이를 입력해도 오류가 발생하지 ㅇ낳음
//     age: '25', // 타입 에러, age는 명시적으로 숫자라고 정의했으므로 문자열이면 에러가 발생함
// }

/**속성 이름의 타입으로 숫자와 문자열을 동시에 사용한 경우*/
// interface YearPriceMap {
//     [year: number]: A; // 속성 이름이 숫자인 A타입은
//     [year: string]: B; // B 타입에 할당 가능해야 함
// }

/**여러 개의 인덱스를 정의해서 사용하기*/
// interface YearPriceMap {
//     [year: number]: number;
//     [year: string]: string | number; // number에 string | number만 할당 가능하므로 타입 에러가 발생하지 않음
// }
// const yearMap: YearPriceMap = {};
// yearMap[1998] = 1000;
// yearMap[1998] = 'abc'; // 타입 에러 발생, 속성 이름이 숫자인데, 문자열을 할당하려고 하여 타입 에러 발생
// yearMap['2000'] = 1234;
// yearMap['2000'] = 'million';

/**함수 타입을 인터페이스로 정의하기*/
// interface getInfoText { // 인터페이스로 함수를 정의할 때는 속성 이름 없이 정의함
//     (name: stirng, age: number): string;
// }
// const getInfoText: GetInfoText = function(name, age) {
//     const nameText = name.substr(0,10);
//     const ageText = age >= 35 ? 'senior' : 'juinior';
//     return `name: ${nameText}, age: ${ageText}`;
// };

/**함수 타입에 속성값 추가하기*/
// interface GetInfoText {
//     (name: string, age: number): string;
//     totalCall: number; // 숫자 타입의 속성값을 정의함
// }
// const getInfoText: GetInfoText = function(name, age) {
//     getInfoText.totalCall += 1; // 타입스크립트는 totalCall 속성값이 숫자라는 것을 앎
//     console.log(`totalCall: ${getInfoText.totalCall}`)
//     // ...
// }
// getInfoText.totalCall = 0;

// interface Person {
//     name: string; // 세 개의 속성에 대한 인터페이스를 정의
//     age: number;
//     isYoungerThan(age: number): boolean;
// }
//
// class SomePerson implements Person { // implements 키워드를 사용해서 인터페이스를 클래스로 구현함 -> 인터페이스에서 정의한 세 속성을 클래스 내부에서 구현하고 있음, 하나라도 빼먹으면 컴파일 에러 발생
//     name: string;
//     age: number;
//     constructor(name: string, age: number) { // 필수값으로 생성자에서 값을 할당하지 않으면 컴파일 에러가 발생하
//         this.name = name;
//         this.age = age;
//     }
//     isYoungerThan(age: number) {
//         return this.age < age;
//     }
// }

/**인터페이스의 확장*/
// interface Person {
//     name: string;
//     age: number;
// }
// interface Korean extends Person { // Person 인터페이스를 확장하여 Korean 인터페이스를 만듦
//     isLiveInSeoul: boolean;
// }
// /*
//    interface Korean { // 확장한 Korean 인터페이스는 이런 형태로 됨
//     name: string;
//     age: number;
//     isLiveInSeoul: boolean;
//    }
// */

/**여러 개의 인터페이스 확장*/
// interface Programmer {
//     favoriteProgrammingLanguage: string;
// }
// interface Korean extends Person, Programmer { // Korean 인터페이스는 Person과 Programmer 인터페이스를 확장함
//     isLiveInSeoul: boolean;
// }

// interface Person {
//     name: string;
//     age: number;
// }
// interface Product {
//     name: string;
//     price: number;
// }
// type PP = Person & Product; // 타입 PP는 합쳐진 두 인터페이스 Person과 Product의 모든 속성값을 포함함 -> 교차 타입이 집합에서의 교집합과 같은 기능을 한다고 하였으나, PP의 타입이 name 속성만 포함하는 게 아니므로 헷갈릴 수 있음
// const pp: PP = { // 속성의 교집합이 아닌 타입이 가질 수 있는 값에 대한 교집합이기 때문이므로
//     name: 'a',
//     age: 23,
//     price: 1000,
// };

/**숫자와 문자열의 타입 호환성*/
// function func1(a: number, b: number | string) {
//     const v1: number | string = a; // 숫자는 number | string 타입에 할당이 가능함
//     const v2: number = b; // 타입 에러, number | string은 숫자에 할당이 안 됨
// }
// function func2(a: 1|2) {
//     const v1: 1 | 3 = a; // 타입 에러, 1 | 3은 1|2에 할당이 안 됨
//     const v2: 1 | 2 | 3 = a; // 1|2는 1 | 2 | 3에 할당이 가능함
// }

/**인터페이스의 타입 호환성*/
// interface Person { // Person과 Product는 이름이 다르나 모든 속성 이름과 타입은 같음
//     name: string;
//     age: number;
// }
// interface Product {
//     name: string;
//     age: number;
// }
// const person: Person = { name : 'mike', age: 23};
// const product: Product = person; // 타입 이름은 다르나 내부 구조가 같으므로 Person과 Product는 서로 할당이 가능함

/**선택 속성 때문에 할당이 어려운 예*/
// interface Person {
//     name: string;
//     age?: number; // age가 선택 속성이면 Person 값의 집합은 Product 값의 집합보다 커짐
// }
// interface Product {
//     name: string;
//     age: number;
// }
// const person: Person = {
//     name: 'mike',
// };
// const product: Product = person; // 타입 에러, Product 값 집합보다 크므로 할당이 가능하지 않음
/**선택 속성이 있어도 할당 가능한 예*/
// interface Person {
//     name: string;
//     age: number;
// }
// interface Product {
//     name: string;
//     age?: number;
// }
/**추가 속성과 유니온 타입이 타입 호환성에 미치는 영향*/
// interface Person {
//     name: string;
//     age: number;
//     gender: string; // 추가 속성이 있으면 값의 집합은 더 작아지므로 Person을 Product에 할당하는 데 문제가 되지 않음
// }
// interface Product {
//     name: string;
//     age: number | string; // 속성 타입의 범위가 넓어지면 값의 집한은 더 커짐 -> Person ⊂ Product는 변함 없음
// }
/**함수 타입의 호환성*/
// type F1 = (a: number, b: string) => number;
// type F2 = (a: number) => number;
// type F3 = (a: number) => number | string;
// let f1: F1 = (a,b) => 1;
// let f2: F2 = a => 1;
// let f3: F3 = a => 1;
// f1 = f2;
// f2 = f1; // 타입 에러, F2보다 F1의 매개변수 갯수가 더 많으므로 F1은 F2에 할당할 수 없음
// f2 = f3; // F3의 반환 타입은 F2의 반환 타입으로 할당 가능하지 않으므로 F3은 F2로 할당 가능하지 않음
/**배열의 map 메서드를 통해 살펴보는 함수의 타입 호환성*/
// function addOne(value: number) {
//     return value + 1;
// }
// const result = [1,2,3].map<number>(addOne); // addOne 함수는 map 메서드의 매개변수로 할당 가능함 -> map 메서드의 제네릭으로 입력한 number는 매개변수 함수의 반환타입을 의미함
// (value: number, index: number, array: number[]) => number // 1번 코드의 map 메서드가 입력받는 함수의 타입을 의미하며, addOne 함수는 이 타입에 할당 가능함
// map 메서드는 세 개의 매개변수를 넘겨주는데, 네 개의 매개변수를 사용하는 함수가 할당되면 문제가 됨 -> 네 번째 매개변수가 전달되지 않기 때문임
// 만약 addOne 함수의 매개변수 타입이 1 | 2 | 3이라면 문제가 됨 -> map 메서드는 다른 숫자도 전달할 수 있으므로
// 만약 addOne 함수의 반환 타입이 number | string 이라면 문제가 됨 -> map 메서드는 숫자 배열을 반환해야하기 때문임
/**리팩터링이 필요한 코드*/
// function makeNumberArray(defaultValue: number, size: number): number[] {
//     const arr: number[] = [];
//     for(let i = 0; i < size; i++) {
//         arr.push(defaultValue);
//     }
//     return arr;
// }
// function makeStringArray(defaultValue: string, size: number): string[] {
//     const arr: string[] = [];
//     for(let i = 0; i<size; i++) {
//         arr.push(defaultValue);
//     }
//     return arr;
// }
// const arr1 = makeNumberArray(1, 10); // 숫자 배열을 생성하는 함수임
// const arr2 = makeStringArray('empty', 10); // 문자열 배열을 생성하는 함수임
//
/**함수 오버로드로 개선한 코드*/
// function makeArray(defaultValue: number, size: number): number[]; // 숫자와 문자열 배열을 만들 수 있도록 함수 타입을 정의함 -> 타입을 추가할 때마다 코드도 추가해야 함, 타입 종류가 10가지 이상이 되면 가독성이 떨어짐
// function makeArray(defaultValue: string, size: string): string[];
// //@ts-ignore
// function makeArray(defaultValue, size) {
//     const arr = [];
//     for(let i = 0; i<size; i++) {
//         arr.push(defaultValue);
//     }
//     return arr;
// }
/**제네릭으로 개선한 코드*/
// function makeArray<T>(defaultValue: T, size: number): T[] { // 타입
//     const arr: T[] = [];
//     for(let i = 0; i<size; i++) {
//         arr.push(defaultValue);
//     }
//     return arr;
// }
// const arr1 = makeArray<number>(1,10);
// const arr2 = makeArray<string>('empty', 10);
// const arr3 = makeArray(1,10);
// const arr4 = makeArray('empty', 10);

/**클래스에서 제네릭 사용하기*/
// class Stack<D> {
//     private items: D[] = []; // 타입 D를 아이템으로 하는 배열을 정의
//     push(item: D) { // push 메서드는 타입이 D인 아이템을 입력으로 받음
//         this.items.push(item);
//     }
//     pop() { // pop 메서드의 반환 타입은 D임
//         return this.items.pop();
//     }
// }
// const numberStack = new Stack<number>(); // 숫자를 저장하는 스택을 생성해서 사용함
// numberStack.push(10);
// const v1 = numberStack.pop();
// const stringStack = new Stack<string>(); // 문자열을 저장하는 스택을 생성해서 사용함
// stringStack.push('a');
// const v2 = stringStack.pop();
//
// let myStack: Stack<number>;
// myStack = numberStack;
// myStack = stringStack; // 타입 에러, 숫자 스택에 문자열을 할당할 수 없음

/**extends 키워드로 제네릭 타입 제한하기*/
// function indentity<T extends number | string>(p1: T): T { // 제네릭 T의 타입을 number | string에 할당가능한 타입으로 제한함
//     return p1;
// }
// indentity(1); // 타입 T는 숫자 또는 문자열 타입만 가능함
// indentity('a');
// indentity([]); // 타입 에러 발생, number | string 타입에 할당가능하지 않으므로 타입 에러 발생
/**extends 키워드를 이용한 제네릭 타입의 활용 예*/
// interface Person {
//     name: string;
//     age: number;
// }
// interface Korean extends Person { // Korean 인터페이스는 Person을 확장해서 만듦 -> Korean 타입은 Person 타입에 할당 가능함
//     liveInSeoul: boolean;
// }
//
// function swapProperty<T extends Person, K extends keyof Person>(p1: T, p2: T, name: K,): void { // 제네릭 T는 Person에 할당가능한 타입이어야 함, 제네릭 K는 Person의 속성 이름이여야 함
//     const temp = p1[name];
//     p1[name] = p2[name];
//     p2[name] = temp;
// }

// const p1: Korean = {
//     name: '홍길동',
//     age: 23,
//     liveInSeoul: true,
// };
// const p2: Korean = {
//     name: '김삿갓',
//     age: 31,
//     liveInSeoul: false,
// };
// swapProperty(p1, p2, 'age'); // p1, p2는 Person에 할당 가능하므로 타입 에러가 발생하지 않음

/**extends 조건을 만족하지 않는 코드*/
// interface Product {
//     name: string;
//     price: number;
// }
// const p1: Product = {
//     name: '시계',
//     price: 1000,
// }
// const p2: Product = {
//     name: '자전거',
//     price: 2000,
// };
// swapProperty(p1, p2, 'name'); // 타입 에러, Product는 Person에 할당가능하지 않으므로 타입 에러가 발생함
/**모든 속성을 선택 속성 또는 읽기 전용으로 변경하기*/
// interface Person { // 맵드 타입의 입력으로 사용될 인터페이스
//     name: string;
//     age: number;
// }
// interface PersonOptional { // Person에 맵드 타입을 적용하여 만든 인터페이스 예시
//     name?: string;
//     age?: number;
// }
// interface PersonReadOnly {
//     readonly name: string;
//     readonly age: number;
// }
/**두 개의 속성을 불 타입으로 만드는 맵드 타입*/
// type T1 = { [K in 'prop1' | 'prop2']: boolean }; // in 키워드 오른족에는 문자열의 유니온 타입이 올 수 있음
// { prop1: boolean; prop2: boolean; } // 맵드 타입으로 만들어진 T1 타입의 모습

/**인터페이스의 모든 속성을 불 타입 및 선택 속성으로 만들어주는 맵드 타입*/
// type MakeBoolean<T> = { [ P in keyof T]?: boolean };
// const pMap: MakeBoolean<Person> = {};
// pMap.name = true;
// pMap.age = false;

/**맵드 타입으로 만드는 Partial과 Readonly*/
// type T1 = Person['name']; // string, 인터페이스에서 특정 속성의 타입을 추출할 때 사용되는 문법으로 맵드 타입에서 많이 사용됨
// type Readonly<T> = { readonly [P in keyof T]: T[P] }; // 인터페이스의 모든 속성을 읽기 전용으로 만들어주는 맵드 타입, keyof T에 의해 인터페이스 T의 모든 속성 이름이 유니온 타입으로 만들어짐, T[P]는 인터페이스 T에 있는 속성 P의 타입을 그대로 사용한다는 의미
// type Partial<T> = { [P in keyof T]?: T[P]}; // 인터페이스의 모든 속성을 선택 속성으로 만들어주는 맵드 타입
// type T2 = Partial<Person>;
// type T3 = Readonly<Person>;

/**Pick 내장 타입*/
// type Pick<T,K extends keyof T> = { [P in K]: T[P]}; //
// interface Person {
//     name: string;
//     age: number;
//     language: string;
// }
// type T1 = Pick<Person, 'name' | 'language'>; // Pick은 인터페이스 T와 해당 인터페이스의 속성 이름 K를 입력으로 받음
// // type T1 = { name: string; language: string; } // Person에서 name, language를 추출한 결과임

/**Record 내장 타입*/
// type Record<K extends string, T> = { [P in K]: T }; // K는 문자열의 서브타입임, K로 입력된 모든 문자열을 속성 이름으로 하면서 T를 각 속성의 타입으로 만듦
// type T1 = Record<'p1' | 'p2', Person>;
// // type T1 = { p1: Person; p2: Person; }

/**열거형 타입의 모든 원소를 속성 이름으로 가지는 객체*/
// enum Fruit {
//     Apple,
//     Banana,
//     Orange,
// }
// const FRUIT_PRICE = { // 과일의 가격 정보를 가지고 있는 객체로 Fruit 열거형 타입에 새로운 과일을 추가한다면 FRUIT_PRICE에도 새로운 과일의 가격 정보를 추가하는 게 일반적임 -> Fruit 열거형 타입에 과일을 추가하고 가격 정보를 깜빡해도 에러는 발생하지 않음
//     [Fruit.Apple]: 1000,
//     [Fruit.Banana]: 1500,
//     [Fruit.Orange]: 2000,
// }
/**맵드 타입을 이용한 FRUIT_PRICE 타입 정의*/
// enum Fruit {
//     Apple,
//     Banana,
// }
// const FRUIT_PRICE: { [key in Fruit]:number } = { // 타입 에러, Orange 속성을 추가해야 함
//     [Fruit.Apple]: 1000,
//     [Fruit.Banana]: 1500,
//     [Fruit.Orange]: 2000,
// }

/**기본적인 조건 타입의 예*/
// T extends U ? X:Y -> 조건부 타입의 기본 구조, 입력된 제네릭 타입 T가 타입 U의 서브타입이면 타입 X를 사용하고, 그렇지 않으면 타입 Y를 사용함
// type IsStringType<T> = T extends string ? 'yes' : 'no'; // IsStringType은 문자열의 서브타입이 입력되면 yes를 사용하고, 그렇지 않으면 no를 사용하는 조건부 타입임
// type T1 = IsStringType<string>; // 'yes'
// type T2 = IsStringType<number>; // 'yes'

/**IsStringType 타입에 유니온 타입을 입력한 결과*/
// type T1 = IsStringType<string | number>; // T1과 T2 둘 다 동일함
// type T2 = IsStringType<string> | IsStringType<number>;

/**Exclude, Extract 타입의 정의와 사용 예*/
// type T1 = number | string | never; // string | number, 유니온 타입에 있는 never 타입은 제거되는데, 이는 조건부 타입에서 자주 사용되던 기능임
// type Exclude<T, U> = T extends U ? never: T; // Exclude 타입은 U의 서브 타입을 제거해주는 유틸리티 타입
// type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7, 3과 7은 1 | 5 | 9 타입의 서브 타입이 아니므로 T2 타입은 3 | 7이 됨
// type T3 = Exclude<string, number | (() => void), Function>; // string | number, T3는 함수가 제거된 string | number 타입임
// type Extract<T, U> = T extends  U ? T: never; // Extract는 Exclude와 반대로 동작하는 유틸리티 타입임
// type T4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5, 1 | 5 | 9에 포함되므로 1 | 5가 됨

/**ReturnType 타입의 정의와 사용 예*/
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R: any; // 입력된 타입 T가 함수이면 함수의 반환 타입이 사용되고, 그렇지 않으면 any 타입이 사용됨
// type T1 = ReturnType<any() => string>; // string
// function f1(s: string): number {
//     return s.length;
// }
// type T2 = ReturnType<typeof f1>; // number

/**infer 키워드를 중첩해서 사용하는 예*/
// type Unpacked<T> = T extends (infer U)[] // 타입 T가 U의 배열이면 U가 사용됨
//     ? U
//     : T extends (...args: any[]) => infer U // 함수면 반환 타입이 사용됨
//         ? U
//         : T extends Promise<infer U> ? U : T; /// 프로미스면 프로미스에 입력된 제네릭 타입이 사용됨
// type T0 = Unpacked<string>; // string, 아무것도 만족하지 않으므로 자기 자신이 됨
// type T1 = Unpacked<string[]>; // string
// type T2 = Unpacked<() => string>; // string
// type T3 = Unpacked<Promise<string>>; // string
// type T4 = Unpacked<Promise<string>[]>; // Promise<string>, Promise<string>의 배열이므로 Promise<string>이 됨
// type T5 = Unpacked<Unpacked<Promise<string>[]>>; // string

/**인터페이스에서 문자열 속성만 추출해서 사용하는 유틸리티 타입*/
// type StringPropertyNames<T> = { // 타입 T에서 값이 문자열인 모든 속성의 이름을 유니온 타입으로 만들어주는 유틸리티 타입
//     [K in keyof T]: T[K] extends String ? K : never
// }[keyof T]; // [keyof T]는 인터페이스에서 모든 속성의 타입을 유니온으로 추출함
// type StringProperties<T> = Pick<T, StringPropertyNames<T>>; // StringProperties는 인터페이스에서 문자열인 모든 속성을 추출하는 유틸리티임
// interface Person {
//     name: string;
//     age: number;
//     nation: string;
// }
// type T1 = StringPropertyNames<Person>; // "name" | "nation"
// type T2 = StringProperties<Person>; // {name: string; nation: string;}

/**일부 속성만 제거해주는 유틸리티 타입*/
// type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof  T, U>>; // 인터페이스 T에서 입력된 속성 이름 U를 제거함
// interface Person {
//     name: string;
//     age: number;
//     nation: string;
// }
// type T1 = Omit<Person, 'nation' | 'age'>;
// const p: T1 = {
//     name: 'mike', // Person에서 nation, age 속성을 제거했으므로, 타입 T1에는 name 속성만 남음
// };

/**인터페이스를 덮어씌우는 유틸리티 타입*/
// type Overwrite<T, U> = { [P in Exclude<keyof T,keyof U>]: T[P] } & U; // 인터페이스 T에 인터페이스 U를 덮어씀
// interface Person {
//     name: string;
//     age: number;
// }
// type T1 = Overwrite<Person, { age: string; nation: string }>;
// const p: T1 = {
//     name: 'mike',
//     age: '23', // age 속성의 타입은 문자열로 변경되었으며, nation 속성은 새로 추가됨
//     nation: 'korea',
// };

/**let 변수의 타입 추론*/
// let v1 = 123; // 타입을 명시하지 않았지만 변수 v1의 타입은 숫자가 됨
// let v2 = 'abc'; // 마찬가지로 변수 v2의 타입은 문자열임
// v1 = 'a'; // 타입 에러,  잘못된 타입의 값을 입력하면 타입 에러가 발생함
// v2 = 456; // 타입 에러,

/**const 변수의 타입 추론*/
// const v1 = 123; // 변수 v1의 타입은 숫자가 아니라 123임
// const v2 = 'abc';
// let v3: typeof v1 | typeof v2; // typeof 키워드는 변수의 타입을 추출할 때 사용할 수 있음, v3의 타입은 123 | 'abc'가 됨

/**배열과 객체의 타입 추론*/
// const arr1 = {10,20,30}; // 배열의 타입을 정의하지 않았지만 타입 추론 덕분에 변수 arr1의 타입은 number[]가 됨
// const [n1, n2, n3] = arr1; // 비구조화 할당의 경우, 타입 추론이 되며, 세 변수의 타입은 모두 숫자가 됨
// arr1.push('a'); // 타입 에러, 숫자 배열에 문자열을 넣으면 타입 에러가 발생함
//
// const arr2 = { id: 'abcd', age: 123, language: 'korean' }; // 객체의 타입을 정의하지 않았지만 타입 추론 덕분에 변수 arr2 타입은 하기와 같아짐
// // const arr2: { id: string; age: number; language: string; }
// const { id, age, language } = arr2; // 비구조화 할당을 하면 자동으로 타입 정보가 포함됨
// console.log(id === age); // 타입 에러, 숫자와 문자열을 비교하려고 시도하면 타입 에러가 발생함

/**여러 가지 타입으로 구성된 배열의 타입 추론*/
// interface Person { // Korean , Japanese 인터페이스는 Person을 확장해서 만듦
//     name: string;
//     age: number;
// }
// interface Korean extends Person {
//     liveInSeoul: boolean;
// }
// interface Japanese extends Person {
//     liveInTokyo: boolean;
// }
//
// const p1: Person = { name: 'mike', age: 23 };
// const p2: Korean = {name: 'mike', age: 25, liveInSeoul: true };
// const p3: Japanese = { name: 'mike', age: 27, liveInTokyo: false };
// const arr1 = [p1, p2, p3]; // 여러 가지 타입을 하나로 통합하는 과정을 거쳐야 함
// const arr2 = [p2, p3];

/**함수의 매개변수와 반환값에 대한 타입 추론*/
// function func1(a = 'abc', b = 10) {
//     return `${a} ${b}`;
// }
//
// func1(3, 6); // 타입 에러, 첫 번째 매개변수는 숫자가 아니기 때문에 타입 에러가 발생함
// const v1: number = func1('a', 1); // 타입 에러, 반환 값은 숫자가 아니기 때문에 타입 에러가 발생함
//
// function func2(value: number) { // return 키워드가 여러 번 등장해도 타입 추론은 잘 동작함 -> 이 함수의 반환 타입은 number | string이 됨
//     if(value < 10) {
//         return value;
//     } else {
//         return `${value} is too big`;
//     }
// }

/**타입 가드를 활용하지 않은 코드*/
// function print(value: number | string) {
//     if(typeof value === 'number') { // typeof 키워드를 이용해서 value가 숫자인지 검사함
//         console.log((value as number).toFixed(2)); // 타입 가드가 없다면 as 키워드를 사용하여 타입스크립트에게 value는 숫자로 알려줘야 함
//     } else {
//         console.log((value as string).trim()); // 숫자가 아니라면 당연히 문자열이나 타입 가드가 없다면 as 키워드로 타입 단언을 해야 함
//     }
// }

/**타입 가드를 활용한 코드*/
// function print(value: number | string) {
//     if(typeof value === 'number') {
//         console.log(value.toFixed(2)); // typeof를 통해 value를 숫자로 인식함, 숫자에만 존재하는 toFixed 메서드를 바로 호출할 수 있음
//     } else {
//         console.log(value.trim()); // value를 문자열로 인식함
//     }
// }

/**instanceof 키워드를 이용한 타입 가드*/
// class Person {
//     name: string;
//     age: number;
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
// }
// class Product {
//     name: string;
//     price: number;
//     constructor(name: string, price: number) {
//         this.name = name;
//         this.price = price;
//     }
// }
// function print(value: Person | Product) {
//     console.log(value.name);
//     if(value instanceof Person) {
//         console.log(value.age); // 타입 가드 덕분에 if 문안에 Person의 age 속성에 접근할 수 있음
//     } else {
//         console.log(value.price); // 타입스크립트는 else 블록에서 value 타입이 Product라고 인식함
//     }
// }
// const person = new Person('mike', 23);
// print(person);
/**instanceof 키워드를 잘못 사용한 예*/
// interface Person {
//     name: string;
//     age: number;
// }
// interface Product {
//     name: string;
//     price: number;
// }
// function print(value: Person | Product) {
//     if(value instanceof Person) { // 인터페이스는 타입 검사에만 사용되는데, 컴파일 후에는 삭제되므로 instanceof 키워드의 오른쪽에 올 수 없음
//         console.log(value.age);
//     } else {
//         console.log(value.price);
//     }
// }

/**식별 가능한 유니온 타입*/
// interface Person {
//     type: 'person'; // 두 인터페이스에 type이라는 같은 이름의 속성을 정의함, 각 속성은 고유의 문자열 리터럴 타입으로 정의했기 때문에 값의 집합에서 서로 겹치는 부분이 없음
//     name: string;
//     age: number;
// }
//
// interface Product {
//     type: 'product';
//     name: string;
//     price: number;
// }
// function print(value: Person | Product) {
//     if(value.type === 'person') {
//         console.log(value.age);
//     } else {
//         console.log(value.price);
//     }
// }

/**switch 문에서 식별가능한 유니온 타입 사용하기*/
function print(value: Person | Product) {
    switch (value.type) {
        case: 'person':
            console.log(value.age); // 타입스크립트는 case 구문 안으로 들어오면 value의 타입을 정확히 알 수 있음
            break;
        case: 'product':
            console.log(value.price);
            break;
    }
}

/**함수를 이용한 가드*/
// function isPerson(x: any): x is Person { // 입력된 인수가 Person 타입인지를 검사하는 함수임 -> is 키워드 왼쪽에는 매개변수 이름을, 오른족에는 타입 이름을 넣음
//     return (x as Person).age !== undefined;
// }
// function print(value: Person | Product) { // age 속성이 있으면 Person 타입이라고 정의함
//     if(isPerson(value)) { // isPerson 함수를 이용하면 타입 가드가 동작됨
//         console.log(value.age);
//     } else {
//         console.log(value.price);
//     }
// }
/**in키워드를 이용한 타입 가드*/
function print(value: Person | Product) {
    if('age' in value) { // 단순히 age 속성이 있는지 검사함
        console.log(value.age); // 속성 이름의 존재를 검사하는 것으로 타입 가드가 동작함
    } else {
        console.log(value.price);
    }
}


/***/