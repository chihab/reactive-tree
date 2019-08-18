import { tree } from '@reactive-tree/json';
import React from "react";
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReactiveConsumer, ReactiveProvider } from "../components";

const nodeReducer = children => {
  return children.some(value => value);
};

const leafReducer$ = permission => {
  // const persmissions = ['CanReadEmail', 'CanReadFirstName', 'CanReadLastName'];
  // return of(persmissions).pipe(
  //   delay(2000),
  //   map((persmissions) => persmissions.some(p => {
  //     return permission === p;
  //   }))
  // );
  const val = permission.length >= 14;
  return of(val)
    .pipe(
      delay(2000)
    )
};

const store = tree(
  {
    User: {
      Form: {
        Email: 'CanWriteEmail',
        FirstName: 'CanWriteFirstName',
        LastName: 'CanWriteLastName'
      },
      List: {
        Email: 'CanReadEmail',
        FirstName: 'CanReadFirstName',
        LastName: 'CanReadLastName'
      }
    }
  },
  nodeReducer,
  leafReducer$
);

export default function Math() {
  return (
    <ReactiveProvider store={store}>
      <h1> User </h1>
      <section>
        <ReactiveConsumer node="User">
          {({ value }) => <h1> {'' + value} </h1>}
        </ReactiveConsumer>
      </section>

      <h2> User.Form </h2>
      <section>
        <ReactiveConsumer node="User.Form">
          {({ value }) => (
            <>
              <h1> {value} </h1>
              <ReactiveConsumer node="Email">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
              <ReactiveConsumer node="FirstName">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
              <ReactiveConsumer node="LastName">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
            </>
          )}
        </ReactiveConsumer>
      </section>

      <h2> User.List </h2>
      <section>
        <ReactiveConsumer node="User.List">
          {({ value }) => (
            <>
              <h1> {value} </h1>
              <ReactiveConsumer node="Email">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
              <ReactiveConsumer node="FirstName">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
              <ReactiveConsumer node="LastName">
                {({ value }) => (
                  <h2>{'' + value}</h2>
                )}
              </ReactiveConsumer>
            </>
          )}
        </ReactiveConsumer>
      </section>
    </ReactiveProvider>
  );
}
