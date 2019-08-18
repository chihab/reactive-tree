import { tree } from "@reactive-tree/json";
import React from "react";
import { fromEvent, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveProvider, useConsumer } from "../components";

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

function Total() {
  const [{ value }] = useConsumer("Total");
  return (
    <section>
      <h1> Total: {value} </h1>
    </section>
  );
}

export default function Hooks() {
  return (
    <ReactiveProvider store={store}>
      <Total></Total>
    </ReactiveProvider>
  );
}
