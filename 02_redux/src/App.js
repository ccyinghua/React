import React, { Component } from 'react';

class App extends Component {
  render() {
    // 接收传递过来的数据
    const store = this.props.store;
    const num = store.getState();
    const addGun = this.props.addGun;
    const removeGun = this.props.removeGun;
    const addGunAsync = this.props.addGunAsync;
    return (
      <div>
        <h1>现在有机枪{num}把</h1>
        {/* store.dispatch派发事件 */}
        <button onClick={() => store.dispatch(addGun())}>申请武器</button>
        <button onClick={() => store.dispatch(removeGun())}>上交武器</button>
        <button onClick={() => store.dispatch(addGunAsync())}>异步添加武器</button>
      </div>
    );
  }
}

export default App;
