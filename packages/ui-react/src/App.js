import { tree } from '@reactive-tree/json';
import { reducerSymbol } from '@reactive-tree/core';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const reducer = (children) => {
  return children.reduce((sum, val) => sum + val, 0)
}
const result = tree({
  Math: {
    Add: {
      [reducerSymbol]: (children) => {
        return children.reduce((sum, val) => sum + val, 0)
      },
      var1: 1,
      var2: 2
    },
    Prod: {
      [reducerSymbol]: (children) => {
        return children.reduce((sum, val) => sum * val, 1)
      },
      var1: 3,
      var2: -1
    }
  }
}, reducer);

class ReactiveNode extends Component {
  state = {};

  componentDidMount() {
    this.sub = this.props.node.output$.subscribe(value => {
      this.setState({
        value
      })
    })
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  render() {
    return this.props.children({value: this.state.value});
  }
}

function App() {
  const total = result.Math;
  const add = result.Math.Add;
  const prod = result.Math.Prod;
  return (
    <div className="App">
      <h1> Total </h1>
      <section>
        <ReactiveNode node={total}>
          {({value}) => (
            <h1> {value} </h1>
          )}
        </ReactiveNode>       
      </section>

      <h2> Add </h2>
      <section>
        <ReactiveNode node={add}>
          {({value}) => (
            <h1> {value} </h1>
          )}
        </ReactiveNode>
        <ReactiveNode node={add.var1}>
          {({value}) => (
            <h3 onClick={() => add.var1.value++}> {value} </h3>
          )}
        </ReactiveNode>
        <ReactiveNode node={add.var2}>
          {({value}) => (
            <h3 onClick={() => add.var2.value++}> {value} </h3>
          )}
        </ReactiveNode>        
      </section>

      <h2> Prod </h2>
      <section>
        <ReactiveNode node={prod}>
          {({value}) => (
            <h1> {value} </h1>
          )}
        </ReactiveNode>
        <ReactiveNode node={prod.var1}>
          {({value}) => (
            <h3 onClick={() => prod.var1.value++}> {value} </h3>
          )}
        </ReactiveNode>
        <ReactiveNode node={prod.var2}>
          {({value}) => (
            <h3 onClick={() => prod.var2.value++}> {value} </h3>
          )}
        </ReactiveNode>        
      </section>

    </div>
  );
}

export default App;
