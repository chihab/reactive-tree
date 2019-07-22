import { combineLatest, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Leaf } from "./Leaf";

type Child = Node<any> | Leaf<any>;

export class Node<T> {
  private subscription: Subscription;

  output$: Observable<T>;

  constructor(
    private children: Child[],
    private reducer: (children: any[]) => T
  ) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const children$ = this.children.map(child => child.output$);
    this.output$ = combineLatest(...children$).pipe(
      map(this.reducer)
    );
  }
  insert() {
    // Unsubscribe from children
    // new subscription
  }
  remove() {}
}
