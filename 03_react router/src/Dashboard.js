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
  render() {
    console.log(this.props)
    const match = this.props.match;  // match.url = '/dashboard'
    const redirectToLogin = <Redirect to='/login'></Redirect>;
    const app = (
      <div>
        <h1>独立团</h1>
        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          <li><Link to={`${match.url}`}>一营</Link></li>
          <li><Link to={`${match.url}/erying`}>二营</Link></li>
          <li><Link to={`${match.url}/qibinglian`}>骑兵连</Link></li>
        </ul>
        <Route path={`${match.url}`} exact component={App}></Route>
        <Route path={`${match.url}/erying`} component={Erying}></Route>
        <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
        {/* <Route path='/:location' component={Test}></Route> */}
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;