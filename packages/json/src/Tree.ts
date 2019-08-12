import { Reducer, Node, Leaf, Child, reducerSymbol } from '@reactive-tree/core';

function isLeaf(value) {
  return typeof value !== 'object';
}

export const tree = function <T = any>(obj: any,
  nodeReducer: Reducer<T>,
  leafReducer$): any {
  const node = Object.keys(obj)
    .reduce((node: Node, key) => {
      const value = obj[key];
      const child: Child = isLeaf(value)
        ? new Leaf(value, leafReducer$)
        : tree(value, nodeReducer, leafReducer$)
      node.insert([child]);
      node[key] = child;
      return node;
    }, new Node());
  node.setReducer(obj[reducerSymbol] || nodeReducer);
  node.output();
  return node;
}