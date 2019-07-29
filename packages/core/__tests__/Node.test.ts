import { Leaf, Node } from "../src";

const add = (children: number[]): number => {
  return children.reduce((sum, val) => sum + val, 0);
};

test("subscribe to a node having leaves as children", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node: Node<number> = new Node([leaf1, leaf2], add);
  node.output$.subscribe(v => {
    expect(v).toBe(17);
    done();
  });
});

test("subscribe to a node having nodes as children", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node1: Node<number> = new Node([leaf1, leaf2], add);
  const node2: Node<number> = new Node([leaf1, leaf1], add);
  const root: Node<number> = new Node([node1, node2], ([v1, v2]) => v1 - v2);
  root.output$.subscribe(v => {
    expect(v).toBe(5);
    done();
  });
});

