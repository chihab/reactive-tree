import { merge, Observable, Subject } from "rxjs";
import { switchMap, takeUntil, tap } from 'rxjs/operators';

export class Leaf<T = any> {
  private _value;
  private input: Subject<T> = new Subject<T>();
  output$: Observable<any>;

  constructor(value, reducer) {
    this.output$ = merge(
      reducer(value).pipe(
        takeUntil(this.input),
        tap(value => this._value = value)
      ),
      this.input.asObservable()
        .pipe(
          switchMap(value => reducer(value)),
          tap(value => this._value = value)
        )
    )
  }

  set value(value: T) {
    this.input.next(value);
  }

  get value(): T {
    return this._value;
  }

  complete(): void {
    this.input.complete();
  }
}
