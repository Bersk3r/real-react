import React from 'react';
import style from './Box3.module.scss';
import cn from 'classnames';

function Box({size}) {
    const isBig = size === 'big';
    const label = isBig ? '큰 박스' : '작은 박스';
    return (
      <div
          className={cn(style.box, {[style.big]:isBig, [style.small]: !isBig})} // 인자 객체 => 조건부 선택 가능
      >
        {label}
      </div>
    );
}

export default Box;