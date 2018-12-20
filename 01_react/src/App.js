import React from 'react'

class App extends React.Component {
  render() {
    // {boss}变量渲染
  	let boss = '李云龙';
    return (
      <div>
        <h2>独立团{boss}</h2>
        <Child1 boss="张大喵"></Child1>
        <Child2 boss="孙德胜"></Child2>
        <Child3 boss="boss3"></Child3>
      </div>
    )
  }
}

// 子组件1
class Child1 extends React.Component {
  // constructor设置初始状态，记得执行super(props)
  constructor(props) {
    super(props)
    this.state = {
      soldiers: ['虎子', '柱子', '王根生']
    }
    // this引用的问题，需要在构造函数里用bind绑定this
    this.addSoldier = this.addSoldier.bind(this)
  }
  // 点击事件
  addSoldier() {
    // this.setState修改state，返回新的state，而不是修改
    this.setState({
      soldiers: [...this.state.soldiers, '新兵蛋子' + Math.random()]
    })
  }
	render() {
    return (
      <div>
        <h3>一营营长，{this.props.boss}</h3>
        <button onClick={this.addSoldier}>新兵入伍</button>
        {/* 若不想在构造函数中用bind绑定this，使用以下写法 */}
        {/* <button onClick={() => this.addSoldier()}>新兵入伍</button> */}
        <ul>
          {/* jsx本质就是js,可直接数据.map */}
          {this.state.soldiers.map(v => <li key={v}>{v}</li>)}
        </ul>
      </div>
    )
  }
}

// 子组件2
// 如果组件只有render函数，可以用函数的形式写组件
function Child2(props) {
  return <h3>骑兵连连长{props.boss},冲啊！</h3>
}

// 子组件3
// 生命周期
class Child3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('组件初始化');
  }
  componentWillMount() {
    console.log('组件马上就要加载了');
  }
  componentDidMount() {
    console.log('组件加载完毕');
  }
  componentWillReceiveProps(nextProps) {
    console.log('组件要接受父组件的值了')
  }
  shouldComponentUpdate(nextProps,nextState) {
    // 唯一用于控制组件重新渲染的生命周期
    // setState以后，state发生变化，组件会进入重新渲染的流程
    // 在这里return false可以阻止组件的更新
    console.log('判断是不是要更新组件');
    return true;
  }
  componentWillUpdate(nextProps,nextState) {
    // shouldComponentUpdate返回true以后，组件进入重新渲染的流程
    console.log('马上要更新组件了')
  }
  componentDidUpdate(prevProps,prevState) {
    console.log('组件更新完毕')
  }
  componentWillUnmount() {
    console.log('组件卸载了')
  }

  render() {
    console.log('组件正在加载');
    return <h3>子组件3:{this.props.boss}</h3>
  }
}


export default App;