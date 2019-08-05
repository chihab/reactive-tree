import { Reducer, Node, Leaf, Child, reducerSymbol } from '@reactive-tree/core';

/**
 * 
 * @param json 
 * @param reducer 
 * 
 **/
export const tree = function <T = any>(obj, reducer: Reducer<T>): any {
  const node = Object.keys(obj)
    .reduce((node: Node, key) => {
      const value = obj[key];
      const child: Child = typeof value === 'object'
        ? tree(value, reducer)
        : new Leaf(value)
      node.insert([child]);
      node[key] = child;
      return node;
    }, new Node());
  node.setReducer(obj[reducerSymbol] || reducer);
  node.output();
  return node;
}