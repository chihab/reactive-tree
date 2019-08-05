import { BehaviorSubject, Observable } from "rxjs";

export class Leaf<T = any> {
  private _value: T;
  private output: BehaviorSubject<T>;

  output$: Observable<T>;

  constructor(value: T = undefined) {
    this.output = new BehaviorSubject<T>(value);
    this.output$ = this.output.asObservable();
  }

  set value(value: T) {
    this._value = value;
    this.output.next(value);
  }

  get value(): T {
    return this._value;
  }

  complete(): void {
    this.output.complete();
  }
}
