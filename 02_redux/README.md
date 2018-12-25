# redux

```
cnpm install redux --save
```

### 一、redux基本用法

- 首先通过reducer新建store，随时通过store.getState获取状态
- 需要状态变更,store.dispatch（action）来修改状态
- Reducer函数接受state和action，返回新的state ，可以用store.subscribe监听每次修改

![](./resource/0.png)

在新建的react项目中，src/index.js改成
```javascript
import { createStore } from 'redux';

// 新建store
// 这就是reducer处理函数，参数是state和新的action
// 根据老的state和新的action生成新的state
function counter(state=0, action) {
  switch(action.type){
    case '加机关枪':
      return state + 1
    case '减机关枪':
      return state - 1
    default:
      return 10
  }
}
const store = createStore(counter)

const init = store.getState();
console.log(`一开始有机枪${init}把`)

function listener() {
  const current = store.getState()
  console.log(`现在有机枪${current}把`)
}
// store.subscribe监听每次修改
store.subscribe(listener)

// 派发事件 传递action，提交状态变更的申请
store.dispatch({type: '加机关枪'})
store.dispatch({type: '加机关枪'})
store.dispatch({type: '减机关枪'})
// console.log(store.getState())
```
启动项目：npm start ，访问localhost:3000看开发者console

![](./resource/1.png)

### 二、react项目中使用redux

- 把store.dispatch方法传递给组件，内部可以调用修改状态
- Subscribe订阅render函数，每次修改都重新渲染
- Redux相关内容，移到单独的文件index.redux.js 单独管理

src/index.redux.js（新建）
```javascript
// redux相关内容

const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

// 这就是reducer处理函数，参数是state和新的action
export function counter(state=0, action) {
  switch(action.type){
    case ADD_GUN:
      return state + 1
    case REMOVE_GUN:
      return state - 1
    default:
      return 10
  }
}

// action creator
export function addGun() {
  return {type: ADD_GUN}
}
export function removeGun() {
  return {type: REMOVE_GUN}
}
```
src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from './App';
import { counter, addGun, removeGun } from './index.redux'

// 新建store
const store = createStore(counter)

// 将store等传递给App组件
function render() {
  ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun}/>, document.getElementById('root'));
}

render()
// 监听，状态改变后，执行render
store.subscribe(render)
```

src/App.js
```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    // 接收传递过来的数据
    const store = this.props.store;
    const num = store.getState();
    const addGun = this.props.addGun;
    const removeGun = this.props.removeGun;
    return (
      <div>
        <h1>现在有机枪{num}把</h1>
        {/* store.dispatch派发事件 */}
        <button onClick={() => store.dispatch(addGun())}>申请武器</button>
        <button onClick={() => store.dispatch(removeGun())}>上交武器</button>
      </div>
    );
  }
}

export default App;
```
![](./resource/2.jpg)

### 三、redux处理异步

Redux默认只处理同步，异步任务需要react-thunk中间件
- npm install redux-thunk --save
- 使用applyMiddleware开启thunk中间件
- Action可以返回函数，使用dispatch提交action

src/index.js
![](./resource/3.jpg)

src/index.redux.js
![](./resource/4.jpg)

src/App.js
![](./resource/5.jpg)

### 四、redux调试工具：redux DevTools

Chrome搜索redux 安装
- 新建store的时候判断window.devToolsExtension
- 使用compose结合thunk和window.devToolsExtension
- 调试窗的redux选项卡，实时看到state

src/index.js
![](./resource/6.jpg)

![](./resource/7.jpg)



