import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';
import { logout } from './Auth.redux';

// 二营组件
function Erying() {
  return <h1>二营</h1>
}
// 骑兵连组件
function Qibinglian() {
  return <h1>骑兵连</h1>
}

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
      <div>
        <ul>
          <li><Link to='/dashboard/'>一营</Link></li>
          <li><Link to='/dashboard/erying'>二营</Link></li>
          <li><Link to='/dashboard/qibinglian'>骑兵连</Link></li>
        </ul>
        <Route path='/dashboard/' exact component={App}></Route>
        <Route path='/dashboard/erying' component={Erying}></Route>
        <Route path='/dashboard/qibinglian' component={Qibinglian}></Route>
        {/* <Route path='/:location' component={Test}></Route> */}
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;