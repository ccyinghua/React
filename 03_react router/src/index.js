import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { 
  BrowserRouter, 
  Route, 
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
// import { counter } from './index.redux'
import reducers from './reducer'

// 新建store
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// console.log(store.getState()); 
// {
//   auth: {isAuth: false, user: '李云龙},
//   counter: 10
// }

// 将store等传递给App组件
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      {/* Switch只渲染命中的第一个模板组件 */}
      <Switch>
        {/* 路由'/erying'或'/qibinglian'也包含'/',{App}组件也会显示，添加exact属性完全匹配解决 */}
        <Route path='/login' component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        {/* 刷新都跳转这个路由了 */}
        <Redirect to='/dashboard'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
