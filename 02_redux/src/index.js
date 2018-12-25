import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { counter, addGun, removeGun, addGunAsync } from './index.redux'

// 新建store
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// 将store等传递给App组件
function render() {
  ReactDOM.render(
    <App store={store} addGunAsync={addGunAsync} addGun={addGun} removeGun={removeGun}/>, 
    document.getElementById('root')
  );
}

render()
// 监听，状态改变后，执行render
store.subscribe(render)
