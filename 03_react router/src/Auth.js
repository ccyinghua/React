import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './Auth.redux';

// 两个reducers每个reducers都有一个state:index.redux.js与Auth.redux.js
// 合并reducers:reducer.js
// 装饰器模式
@connect(
  // 你要state什么属性放到props里
  state => state.auth,
  // 你要什么方法，放到props里，自动dispatch
  { login }
)

class Auth extends React.Component {
  render() {
    return (
      <div>
        { this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null }
        <h2>你没有权限，需要登录才能看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth;