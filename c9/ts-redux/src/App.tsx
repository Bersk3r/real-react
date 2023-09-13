import React from 'react';
import { Provider } from 'react-redux';
import { store } from './common/store';
import Person from './person/component/Person';
import Product from './product/component/Product';


function App() {
  return (
    <Provider store={store}>
      <div>
        <Person birthday="2015-04-15"></Person> {/*원래 Person 컴포넌트가 가진 속성은 birthday 하나이므로 그 외의 속성을 입력하려고 시도하면 타입 에러가 발생함*/}
        <Product />
      </div>
    </Provider>
  );
}

export default App;
