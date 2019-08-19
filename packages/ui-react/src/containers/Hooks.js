import React from "react";
import { tree } from "@reactive-tree/json";
import { of } from "rxjs";
import { ReactiveProvider, useConsumer } from "../components";

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
  val => of(val)
);

function Node({ path }) {
  const [{ loading, value }] = useConsumer(path);
  return loading ? <span> Loading </span> : <h1> {value} </h1>;
}

function Leaf({ path }) {
  const [{ loading, value, node }] = useConsumer(path);
  return loading ? (
    <span> Loading </span>
  ) : (
    <h2 onClick={() => node.value++}> {value} </h2>
  );
}

function Total() {
  return (
    <>
      <Node path="Total" />
      <Node path="Total.Add" />
      <Node path="Total.Prod" />
      <Leaf path="Total.Add.var1" />
      <Leaf path="Total.Add.var2" />
    </>
  );
}

export default function Hooks() {
  return (
    <ReactiveProvider store={store}>
      <Total />
    </ReactiveProvider>
  );
}
