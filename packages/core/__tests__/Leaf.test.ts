import { Leaf } from "../src";
import { last, switchMap } from "rxjs/operators";
import { of } from "rxjs";

test("create leaf with empty constructor", () => {
  const leaf = new Leaf<number>();
  expect(leaf.value).toBe(undefined);
  leaf.output$.subscribe(v => {
    expect(v).toBe(undefined);
  });
});

test("create a leaf get notified to value update", done => {
  const leaf = new Leaf<number>(6);
  leaf.value = 10;
  expect(leaf.value).toBe(10);
  leaf.output$.subscribe(v => {
    expect(v).toBe(10);
    done();
  });
});

test("create a leaf get notified to the last value set", done => {
  const leaf = new Leaf<number>(6);
  leaf.output$.pipe(last()).subscribe(v => {
    expect(v).toBe(12);
    done();
  });
  leaf.value = 10;
  expect(leaf.value).toBe(10);
  leaf.value = 12;
  expect(leaf.value).toBe(12);
  leaf.complete();
});

// test("create a reactive leaf that gets updateded whenever a new event comes", done => {
//   const leaf = new Leaf<number>(6);
//   leaf.output$.pipe(last()).subscribe(v => {
//     expect(v).toBe(12);
//     done();
//   });
//   leaf.value = 10;
//   expect(leaf.value).toBe(10);
//   leaf.value = 12;
//   expect(leaf.value).toBe(12);
//   leaf.complete();
// });
