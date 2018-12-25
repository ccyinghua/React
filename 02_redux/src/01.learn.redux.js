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









// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
