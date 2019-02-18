# react router

将02_redux项目为基础添加router：[02_redux](https://github.com/ccyinghua/React/tree/master/02_redux)

- [**一、初识router4**](#一、初识router4)
- [**二、与redux配合**](#二、与redux配合)


### <a id="一、初识router4"></a>一、初识router4

1、router4使用react-router-dom作为浏览器端的路由。
```
cnpm install react-router-dom --save
```
- BrowserRouter,包裹整个应用
- Router 路由对应渲染的组件，可嵌套
- Link 跳转专用

src/index.js
```javascript
import { BrowserRouter, Route, Link } from 'react-router-dom';
```
![](./resource/1.jpg)

![](./resource/2.jpg)

2、其他组件：
- url参数，Route组件参数可用冒号表示参数
- Redirect组件跳转
- Switch只渲染一个子Route组件，可用于路由错误时渲染404组件等

```javascript
import { 
  BrowserRouter, 
  Route, 
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

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

{/* 页面刷新都跳转这个路由了 */}
<Redirect to='/aa'></Redirect>

{/* Switch只渲染命中的第一个模板组件：无Switch时'/erying'等路由也会匹配'/:location'从而渲染Test组件 */}
<Switch>
  {/* 路由'/erying'或'/qibinglian'也包含'/',{App}组件也会显示，添加exact属性完全匹配解决 */}
  <Route path='/' exact component={App}></Route>
  <Route path='/erying' component={Erying}></Route>
  <Route path='/qibinglian' component={Qibinglian}></Route>
  <Route path='/:location' component={Test}></Route>
</Switch>
```
无Switch时：<br>
![](./resource/3.jpg)

有Switch时：<br>
![](./resource/4.jpg)

有Switch，路由错误时：<br>
![](./resource/5.jpg)


### <a id="二、与redux配合"></a>二、与redux配合

- 复杂redux应用，多个reducer,用combineReducers合并

reducer.js
```javascript
// 合并所有reducer 并且返回
import { combineReducers } from 'redux';
import { counter } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({counter, auth})
```
src/index.js
```javascript
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
```
使用：
```javascript
import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';
import { logout } from './Auth.redux';

// 两个reducers每个reducers都有一个state:index.redux.js与Auth.redux.js
// 合并reducers:reducer.js
// 装饰器模式
@connect(
  // 你要state什么属性放到props里
  state => (state.auth),
  // 你要什么方法，放到props里，自动dispatch
  { logout }
)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    const redirectToLogin = <Redirect to='/login'></Redirect>;
    const app = (
      <h2>......</h2>
    )
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;
```










