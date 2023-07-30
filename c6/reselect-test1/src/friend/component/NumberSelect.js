/**reselect 패키지 없이 구현*/
import React from "react";

export default function NumberSelect({vale, options, postfix, onChange})
{
  return (
    <div>
      <select
        onChange={e => {
          const value = Number(e.currentTarget.value);
          onChange(value); // 사용자가 옵션을 선택하면 이를 부모 컴포넌트에게 알려줌
        }}
        value={value}
      >
        {options.map(option => ( // 부모 컴포넌트에서 알려 준 옵션 목록을 화면에 출력함 => 주어진 속성값으로 화면을 기리는 방법만 표현하고 있으므로 프레젠테이션 컴포넌트로 만듦
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {postfix}
    </div>
  );
}