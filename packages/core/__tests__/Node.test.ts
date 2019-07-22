import { Node, Leaf } from "../src";

const add = (children: number[]): number => {
  return children.reduce((sum, val) => sum + val, 0);
};

test("create node with empty constructor", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node: Node<number> = new Node([leaf1, leaf2], add);
  node.output$.subscribe(v => {
    expect(v).toBe(17);
    done();
  });
});

test("create node with empty constructor", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node: Node<number> = new Node([leaf1, leaf2], add);
  const root: Node<number> = new Node([node], ([v]) => v);
  root.output$.subscribe(v => {
    expect(v).toBe(17);
    done();
  });
});

