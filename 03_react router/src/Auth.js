import React from 'react';
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
  constructor(props) {
    super(props)
  }
  render() {
    return <h2>Auth page</h2>
  }
}

export default Auth;