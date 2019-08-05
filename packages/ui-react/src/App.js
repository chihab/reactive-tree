import { tree } from '@reactive-tree/json';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const reducer = (children) => {
  return children.reduce((sum, val) => sum + val, 0)
}
const result = tree({
  Math: {
    Add: {
      // [reducerSymbol]: (children) => {
      //   return children.reduce((sum, val) => sum + val, 0)
      // },
      var1: 1,
      var2: 2
    },
    Sub: {
      // [reducerSymbol]: (children) => {
      //   return children.reduce((sum, val) => sum - val, 0)
      // },
      var1: 3,
      var2: -1
    }
  }
}, reducer);

class ReactiveNode extends Component {
  render() {

  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ReactiveNode node={result.Math.Add}>
          {(value) => (
            <h1> {value} </h1>
          )}
        </ReactiveNode>
        <ReactiveNode node={result.Math.Add.var1}>
          {(value) => (
            <h3> {value} </h3>
          )}
        </ReactiveNode>        
      </header>
    </div>
  );
}

export default App;
