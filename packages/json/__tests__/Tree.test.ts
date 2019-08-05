import { reducerSymbol } from '@reactive-tree/core'
import { tree } from '../src';
import { take, skip } from 'rxjs/operators';

test('should construct a Tree from json', done => {
  const reducer = (children) => {
    return children.reduce((sum, val) => sum + val, 0)
  }
  const result = tree({
    Math: {
      Add: {
        [reducerSymbol]: (children) => {
          return children.reduce((sum, val) => sum + val, 0)
        },
        var1: 1,
        var2: 2
      },
      Sub: {
        [reducerSymbol]: (children) => {
          return children.reduce((sum, val) => sum - val, 0)
        },
        var1: 3,
        var2: -1
      }
    }
  }, reducer); // Optimization test to instantly access a node from a dot notation

  result.Math.Add.output$.pipe(take(1)).subscribe(v => {
    expect(v).toBe(3);
  }); 

  result.Math.Add.output$.pipe(skip(1), take(1)).subscribe(v => {
    expect(v).toBe(5);
  }); 
  result.Math.Add.var1.value = 3;

  result.Math.Add.output$.pipe(skip(1), take(1)).subscribe(v => {
    expect(v).toBe(9);
    done();
  }); 
  result.Math.Add.var2.value = 6;
  
});
