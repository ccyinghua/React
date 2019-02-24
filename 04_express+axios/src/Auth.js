import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getUserData } from './Auth.redux';
import axios from 'axios';

// 两个reducers每个reducers都有一个state:index.redux.js与Auth.redux.js
// 合并reducers:reducer.js
// 装饰器模式
@connect(
  // 你要state什么属性放到props里
  state => state.auth,
  // 你要什么方法，放到props里，自动dispatch
  { login, getUserData }
)

class Auth extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: {}
  //   }
  // }
  componentDidMount() {
    console.log('组件加载完毕');
    // axios.get('/data').then(res => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     this.setState({data: res.data[0]})
    //   }
    // })
    this.props.getUserData()
  }
  render() {
    return (
      <div>
        <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
        { this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null }
        <h2>你没有权限，需要登录才能看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth;