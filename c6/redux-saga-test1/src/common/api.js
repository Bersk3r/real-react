// export function callApiLike() {
//   return new Promise((resolve, reject) => { // callApiLike 함수는 1초 후에 이행됨 상태가 되는 프로미스 객체를 반환함
//     setTimeout(resolve, 1000);
//   });
// }

/**사가 함수의 예외 처리*/
export function callApiLike() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() * 10 < 5) { // Math.random 함수를 이요하여 간헐적으로 프로미스 객체가 거부됨 상태가 되도록 함
        resolve();
      } else {
        reject("callApiLike 실패");
      }
    }, 1000);
  });
}