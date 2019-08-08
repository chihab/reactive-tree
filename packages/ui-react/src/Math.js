import React, { Fragment } from "react";
import { ReactiveConsumer } from "./components";

export default function Math() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
