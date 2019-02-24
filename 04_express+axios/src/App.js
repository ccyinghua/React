import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';

// App需要的属性
// const mapStateToProps = (state) => {
//   return {num: state}
// }
// App需要的方法集合
// const actionCreators = {addGun, removeGun, addGunAsync};
// connect包裹App
// App = connect(mapStateToProps, actionCreators)(App);

// 装饰器模式
@connect(
  // 你要state什么属性放到props里
  state => ({num: state.counter}),
  // 你要什么方法，放到props里，自动dispatch
  {addGun, removeGun, addGunAsync}
)

class App extends Component {
  render() {
    // num, addGun, removeGun, addGunAsync都是connect给的，不需要手动dispatch
    return (
      <div>
        <h1>现在有机枪{this.props.num}把</h1>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>异步添加武器</button>
      </div>
    );
  }
}
export default App;
