import { tree } from "@reactive-tree/json";
import React from "react";
import { ReactiveConsumer } from "../components";
import { ReactiveProvider } from "../components";

const reducer = children => {
  return children.reduce((sum, val) => sum + val, 0);
};

const store = tree(
  {
    Total: {
      Add: {
        var1: 1,
        var2: 2
      },
      Prod: {
        var1: 3,
        var2: -1
      }
    }
  },
  reducer
);

export default function Math() {
  return (
    <ReactiveProvider store={store}>
      <h1> Total </h1>
      <section>
        <ReactiveConsumer node="Total">
          {({ value }) => <h1> {value} </h1>}
        </ReactiveConsumer>
      </section>

      <h2> Add </h2>
      <section>
        <ReactiveConsumer node="Total.Add">
          {({ value }) => (
            <>
              <h1> {value} </h1>
              <ReactiveConsumer node="var1">
                {({ node, value }) => (
                  <h1 onClick={() => node.value++}> {value} </h1>
                )}
              </ReactiveConsumer>
              <ReactiveConsumer node="var2">
                {({ node, value }) => (
                  <h1 onClick={() => node.value--}> {value} </h1>
                )}
              </ReactiveConsumer>
            </>
          )}
        </ReactiveConsumer>
      </section>
    </ReactiveProvider>
  );
}
