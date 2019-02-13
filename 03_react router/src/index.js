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
import App from './App';
import { counter } from './index.redux'

// 新建store
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// 二营组件
function Erying() {
  return <h1>二营</h1>
}
// 骑兵连组件
function Qibinglian() {
  return <h1>骑兵连</h1>
}

// 测试组件
class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return <h2>404组件：路由参数值为 {this.props.match.params.location}</h2>
  }
}

// 将store等传递给App组件
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to='/'>一营</Link></li>
          <li><Link to='/erying'>二营</Link></li>
          <li><Link to='/qibinglian'>骑兵连</Link></li>
        </ul>

        {/* 刷新都跳转这个路由了 */}
        {/* <Redirect to='/aa'></Redirect> */}

        {/* Switch只渲染命中的第一个模板组件：无Switch时'/erying'等路由也会匹配'/:location'从而渲染Test组件 */}
        <Switch>
          {/* 路由'/erying'或'/qibinglian'也包含'/',{App}组件也会显示，添加exact属性完全匹配解决 */}
          <Route path='/' exact component={App}></Route>
          <Route path='/erying' component={Erying}></Route>
          <Route path='/qibinglian' component={Qibinglian}></Route>
          <Route path='/:location' component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
