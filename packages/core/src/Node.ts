import { combineLatest, merge, Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { Leaf } from "./Leaf";

export type Child<T = any> = Node<T> | Leaf<T>;
export type Reducer<T> = (children: Child<T>[]) => T;
export const reducerSymbol = Symbol('__reducer__');

export class Node<T = any> {
  private update: Subject<T> = new Subject<T>();
  private children: Child<T>[] = [];
  private reducer: Reducer<T>;

  output$: Observable<T>;

  constructor(children?: Child<T>[], reducer?: Reducer<T>) {
    this.insert(children || []);
    this.setReducer(reducer);
    this.output();
  }

  output() {
    if (this.children.length) {
      this.output$ = this.output$ || merge(
        this.observe().pipe(
          takeUntil(this.update)
        ),
        this.update.asObservable()
          .pipe(
            switchMap(() => {
              return this.observe();
            })
          )
      )
    }
  }

  insert(children: Child[]) {
    this.children = [...this.children, ...children];
    if (this.output$) {
      this.update.next();
    }
  }

  remove(child: Child<T>) {
    this.children = this.children.filter(c => c !== child);
    if (this.output$) {
      this.update.next();
    }
  }

  setReducer(reducer: Reducer<T>) {
    this.reducer = reducer;
  }

  getReducer() {
    return this.reducer;
  }

  protected observe() {
    return combineLatest(...this.children.map(child => child.output$)).pipe(
      map(this.reducer)
    );
  }
}
