import { reducerSymbol } from "@reactive-tree/core";
import { tree } from "@reactive-tree/json";
import React from "react";
import "./App.css";
import { ReactiveProvider } from "./components";
import Math from './Math';

const reducer = children => {
  return children.reduce((sum, val) => sum + val, 0);
};
const result = tree(
  {
    Total: {
      Add: {
        [reducerSymbol]: children => {
          return children.reduce((sum, val) => sum + val, 0);
        },
        var1: 1,
        var2: 2
      },
      Prod: {
        [reducerSymbol]: children => {
          return children.reduce((sum, val) => sum * val, 1);
        },
        var1: 3,
        var2: -1
      }
    }
  },
  reducer
);

function App() {
  return (
    <div className="App">
      <ReactiveProvider store={result}>
        <Math></Math>
      </ReactiveProvider>
    </div>
  );
}

export default App;
