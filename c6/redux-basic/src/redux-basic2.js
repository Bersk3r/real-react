/**액션을 발생시키는 예제 코드*/
store.dispatch({type: 'ADD', title: '영화 보기', priority: 'high'}); //
store.dispatch({type: 'REMOVE', id: 123});
store.dispatch({type: 'REMOVE_ALL'});

/**액션 타입을 유일한 값으로 만들기 위해 접두사 이용하기*/
store.dispatch({type: 'todo/ADD', title: '영화 보기', priority: 'high'});
store.dispatch({type: 'todo/REMOVE', id: 123});
store.dispatch({type: 'todo/REMOVE_ALL'});

/**액션 생성자 함수의 예*/
function addTodo({title, priority}) { // 두 속성이 필요하도록 강제할 수 있음
  return { type: 'todo/ADD', title, priority};
}

function removeTodo({ id }) {
  return {type: 'todo/REMOVE', id};
}

function removeAllTodo() {
  return { type: 'todo/REMOVE_ALL'};
}

store.dispatch(addTodo({title: '영화 보기', priority: 'high'}));
store.dispatch(removeTodo({id: 123}));
store.dispatch(removeAllTodo());

/**액션 타입은 변수로 만들어 관리한다*/
export const ADD = 'todo/ADD'; // type 이름을 상수 변수로 만들었음
export const REMOVE = 'todo/REMOVE';
export const REMOVE_ALL = 'todo/REMOVE_ALL';

export function addTodo({title, priority}) {
  return {type: ADD, title, priority};
}

export function removeTodo({id}) {
  return { type: REMOVE, id};
}

export function removeAllTodo() {
  return {type: REMOVE_ALL};
}

/**미들웨어의 기본 구조*/
const myMiddleware = store => next => action => next(action);

/**화살표 함수를 사용하지 않은 미들웨어 코드*/
const myMiddleware = function(store) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
};

/**미들웨어를 설정하는 방법*/
import { createStore, applyMiddleware } from 'redux';
const middleware1 = store => next => action => {
  console.log('middleware1 start');
  const result = next(action);
  console.log('middleware1 end');
  return result;
};
const middleware2 = store => next => action => {
  console.log('middleware2 start');
  const result = next(action);
  console.log('middleware2 end');
  return result;
};

const myReducer = (state, action) => {
  console.log('myReducer');
  return state;
};
const store = createStore(myReducer, applyMiddleware(middleware1, middleware2));
store.dispatch({type: 'someAction'});

const applyMiddleware = {...middlewares} => createStore => (...args) => {
  const store = createStore(...args); // 입력된 createStore 함수를 호출해서, 스토어를 생성함.
  const funcsWithStore = middlewares.map(middleware => middleware(store)); // 생성된 스토어와 함께 모든 미들웨어의 첫 번째 함수를 호출함,
  const chainedFunc = funcsWithStore.reduce((a,b) => bext - a(b(next)));

  return {
    ...store,
    dispatch: chainedFunc(store.dispatch),
  };
};

/**dispatch 메서드의 내부 구현*/
function dispatch(action) {
  currentState = currentReducer(currentState, action);  // 리듀서 함수를 호출하여 상탯값 변경
  for(let i= 0; i < listener.length; i++) {
    listeners[i](); // dispatch 메서드가 호출될 때마다 등록된 모든 이벤트 처리를 함수를 호출함
  }
  return action;
}

/**로그를 출력해주는 미들웨어*/
const printLog = store => next => action => {
  console.log(`prev state = ${store.getState()}`);
  const result = next(action); // next 함수를 호출하면 리듀서가 호출되므로 next 함수 호출 전후로 로그를 출력함
  console.log(`next state = ${store.getState()}`);
  return result;
};

/**에러 정보를 전송해주는 미들웨어*/
const reportCrash = store => next => action => {
  try {
    return next(action);
  } catch(err) {
    // 서버로 예외 정보 전송
  }
};

/**실행을 연기할 수 있는 미들웨어*/
const delayAction = store => next => action => {
  const delay = action.meta && action.meta.delay; // 액션 객체에 delay 정보가 포함되어 있지 않으면 아무 일도 하지 않음
  if(!delay) {
    return next(action);
  }
  const timeoutId = setTimeout(() => next(action), delay); // 만약 delay 정보가 포함되어 있으면 정해진 시간만큼 연기함
  return function cancel() { // 반환된 함수를 호출하면 next 함수의 호출을 막을 수 있음
    clearTimeout(timeoutId);
  };
};

/**미들웨어에 의해서 실행이 연기되는 액션의 예*/
const cancel = store.dispatch( {
  type: 'someAction',
  meta: {delay: 1000}, // 액션 처리를 1초동안 연기하기 위해 delay 정보를 입력함
});
// ...
cancel(); // 원하는 순간에 액션 처리를 취소할 수 있음

/**로컬 스토리지에 값을 저장하는 미들웨어*/
const saveToLocalStorage = store => next => action => {
  if(action.type === 'SET_NAME') { // SET_NAME 액션이 발생할 때마다 로컬 스토리지에 값을 저장함
    localStorage.setItem('name', action.name);
  }
  return next(action);
}

/**할 일 목록 데이터를 나타내는 리듀서 함수*/
function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    // ...
    case REMOVE_ALL:
      return {
        ...state,
        todos: [],
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    default:
      return state;
  }
}

const INITIAL_STATE = {todos: []};

/**중첩된 객체의 데이터 수정하기*/
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        todos: [
          state.todos,
          { id: getNewId(), title: action.title, priority: action.priority},
        ],
      };
      // ...
  }
}

/**이머를 사용해서 불변 객체를 관리하는 예*/
import produce from 'immer';

const person = {name: 'mike', age: 22};
const newPerson = produce(person, draft => {  // 해당 함수의 첫 번째 매개변수는 변경하고자 하는 객체, 두 번째 매개변수는 첫 번째 매개변수로 입력된 객체를 수정하는 함수
  draft.age = 32;
});

/**이머를 사용해서 리듀서 함수 작성하기*/
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) { // switch 문 전체를 produce로 감쌈
      case ADD:
        draft.todos.push(action, todo); // 이머를 사용했기 때문에, 배열의 push 메서드를 사용해도 기존 상탯값은 직접 수정 되지 않고, 새로운 객체가 생성됨
        break;
      case REMOVE_ALL:
        draft.todos = [];
        break;
      case REMOVE:
        draft.todos = draft.todos.filter(todo => todo.id !== action.id);
        break;
      default:
        break;
    }
  });
}

/**잘못된 데이터 참조의 예*/
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_SELECTED_PEOPLE:
        draft.selectedPeople = draft.peopleList.find( // selectedPeople 변수는 선택된 사람을 참조함
          item => item.id === action.id,
        );
        break;
      case EDIT_PEOPLE_NAME: // 만약 selectedPeople 변수가 참조하는 사람의 정보가 수정되면 selectedPeople 변수는 더 이상 그 사람을 참조하지 못함 => 이는 사람 정보가 수정될 때 새로운 객체가 생성되는데, selectedPeople 변수는 오래된 객체를 참조하기 때문임
        const people = draft.peopleList.find(item => item.id === action.id);
        people.name = action.name;
        break;
      // ...
    }
  });
}

/**ID값을 이용해서 데이터를 참조하는 예*/
function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_SELECTED_PEOPLE:
        draft.seletedPeople = action.id; // id 값으로 참조하면 객체의 데이터가 변경되어도 문제없이 데이터를 가리킬 수 있음
        break;
        // ...
    }
  });
}

/**순수 함수가 아닌 리듀서 함수의 예*/
function reducer(state=INITIAL_STATE, action) {
  return produce(state,draft => {
    switch(action.type) {
      case SAY_HELLO:
        const random = Math.floor(Math.random() * 10 + 1); // random 함수를 사용하여 다음 상탯값을 만들면 안 됨 => 랜덤 함수를 사용하면 같은 인수로 호출해도 다른 값이 반환될 수 있으므로, 순수 함수가 아님
        draft.msg = `안녕하세요, ${
          action.name
        }님의 행운의 숫자는 ${random}입니다.`;
        break;
      case INCREMENT:
        callApi({ uri: '/sendActionLog', data: action});
        draft.value += 1;
        break;
        // ...
    }
  });
}

/**createReducer 함수로 작성한 리듀서 함수*/
const reducer = createReducer(INITIAL_STATE, { // createReducer 함수의 첫 번째 인자로 초기 상탯값을 입력함
  [ADD] : (state, action) => state.todos.push(action.todo), // createReducer 함수의 두 번째 인자는 액션 처리 함수를 담고 있는 객체임
  [REMOVE_ALL] : state => (state.todos =[]),
  [REMOVE]: (state, action) =>
    {state.todos = state.todos.filter(todo => todo.id !== action.id)},
});

/**createReducer 함수의 코드*/
import produce from 'immer';

function createReducer(initialState, handleMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handleMap[action.type];
      if(handler) {
        handler(draft, action);
      }
    });
  };
}

/**스토어의 subscribe 메서드를 사용한 예*/
const INITIAL_STATE = { value: 0 };
const reducer = createReducer(INITIAL_STATE, {
  INCREMENT: state => { state.value +=1; },
});
const store = createStore(reducer);

let prevState;
store.subscribe(() => { // subscribe 메서드를 이용하여 이벤트 처리 함수를 등록함
  const state = store.getState();
  if(state === prevState) { // 상탯값이 변경되었는지 검사함 => 상탯값은 불변 객체이기 때문에 이런 단순한 비교로 상탯값 변경 여부를 확인할 수 있음
    console.log('상탯값 같음');
  } else {
    console.log('상탯값 변경됨');
  }
  prevState = state;
})

store.dispatch({type: 'INCREMENT'}); // INCREMENT 액션이 발생되면 상탯값 변경됨 로그가 출력됨
store.dispatch({type: 'OTHER_ACTION'}); // 등록되지 않은 액션이 발생하면 상탯값 같음 로그 출력
store.dispatch({type: 'INCREMENT'});

