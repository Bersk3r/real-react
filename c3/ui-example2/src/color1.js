let color = "red";
function Colors() {
    function onClick() {
      color = "blue";
    }
    return (
      <button style={{backgroundColor: color}} onClick={onClick}>좋아요</button>
    );
}

export default Colors;