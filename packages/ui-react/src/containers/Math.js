import { tree } from "@reactive-tree/json";
import React from "react";
import { ReactiveConsumer } from "../components";
import { ReactiveProvider } from "../components";
import { fromEvent, interval, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';


const click$ = fromEvent(document, 'click');

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
  children => of(children.reduce((sum, val) => sum + val, 0)),
  val => click$.pipe(
    map(() => val++)
  )
);


function Circle(props) {
  const { value, onClick } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 200">
      <circle onClick={onClick} r={value} cy="97" cx="497"
        strokeWidth="1" stroke="#E4AF4C"
        fill="#F4D37D" />
    </svg>
  )
}

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
                  <Circle onClick={(e) => {
                    node.value++;
                    e.preventDefault(); 
                  }} value={value}></Circle>
                )}
              </ReactiveConsumer>
            </>
          )}
        </ReactiveConsumer>
      </section>

      <h2> Prod </h2>
      <section>
        <ReactiveConsumer node="Total.Prod">
          {({ value }) => (
            <h1> {value} </h1>
          )}
        </ReactiveConsumer>
      </section>
    </ReactiveProvider>
  );
}
