import React, {useState} from "react";
function Colors() {
    const [color, setColor] = useState('red');
    function onClick() {
      setColor("blue");
    }
    return (
      <button style={{backgroundColor: color}} onClick={onClick}>좋아요</button>
    );
}

export default Colors;