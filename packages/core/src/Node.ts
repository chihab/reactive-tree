import { combineLatest, merge, Observable, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Leaf } from "./Leaf";

export type Child<T = any> = Node<T> | Leaf<T>;
export type Reducer<T> = (children: Child[]) => T;
export const reducerSymbol = Symbol('__reducer__');

export class Node<T = any> {
  private update: Subject<T> = new Subject();
  private children: Child<T>[] = [];
  private reducer: Reducer<T>;

  output$: Observable<T>;

  constructor() { }

  output() {
    this.output$ = merge(
      this.observe(),
      this.update.asObservable()
        .pipe(
          switchMap(() => {
            return this.observe();
          })
        )
    )
  }
  setReducer(reducer) {
    this.reducer = reducer;
  }
  getReducer() {
    return this.reducer;
  }
  insert(children: Child[]) {
    this.children = [...this.children, ...children];
    if (this.output$) {
      this.update.next();
    }
  }
  remove(child: Child) {
    this.children = this.children.filter(c => c !== child);
    if (this.output$) {
      this.update.next();
    }
  }
  protected observe() {
    return combineLatest(...this.children.map(child => child.output$)).pipe(
      map(this.reducer)
    );
  }
}
