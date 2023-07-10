import './App.css';
import './test.css';
import TodoList from "./TodoList";
function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}
// console.log(`NODE_DEV = ${process.env.NODE_ENV}`);
// console.log(`REACT_APP_DATA_API = ${process.env.NODE_ENV}`);
// console.log(`REACT_APP_LOGIN_API = ${process.env.NODE_ENV}`);
console.log(`REACT_APP_NODE_VERSION = ${process.env.REACT_APP_NODE_VERSION}`);
export default App;
