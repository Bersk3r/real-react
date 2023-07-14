import React from "react";
function Title(props) {
  // props.title = 'abc'; // 불변 변수여서 Cannot assign to read only property 'title' of object 에러 발생
  return <p>{props.title}</p>
}

export default React.memo(Title);