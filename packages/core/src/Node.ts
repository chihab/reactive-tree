import { combineLatest, merge, Observable, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Leaf } from "./Leaf";

type Child = Node<any> | Leaf<any>;

export class Node<T> {
  update: Subject<T> = new Subject();
  output$: Observable<T>;

  constructor(
    private children: Child[],
    private reducer: (children: any[]) => T
  ) {
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
  observe() {
    return combineLatest(...this.children.map(child => child.output$)).pipe(
      map(this.reducer)
    );
  }
  insert(child: Child) {
    this.children.push(child);
    this.update.next();
  }
  remove(child: Child) {
    this.children = this.children.filter(c => c !== child);
    this.update.next();
  }
}
