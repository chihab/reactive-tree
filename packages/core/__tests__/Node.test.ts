import { Leaf, Node } from "../src";
import { take, skip } from 'rxjs/operators';

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

test("update leaf", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node: Node<number> = new Node([leaf1, leaf2], add);
  node.output$.pipe(skip(1)).subscribe(v => {
    expect(v).toBe(12);
    done();
  });
  leaf2.value = 6;
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

test("add/remove children to a node", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node: Node<number> = new Node([leaf1], add);
  
  node.output$.pipe(take(1)).subscribe(v => {
    expect(v).toBe(6);
  });
  
  node.output$.pipe(skip(1), take(1)).subscribe(v => {
    expect(v).toBe(17);
  });
  node.insert(leaf2);

  node.output$.pipe(skip(1), take(1)).subscribe(v => {
    expect(v).toBe(11);
    done();
  });
  node.remove(leaf1);
});

test("grand parent gets notified after adding child to a node", done => {
  const leaf1: Leaf<number> = new Leaf(6);
  const leaf2: Leaf<number> = new Leaf(11);
  const node1: Node<number> = new Node([leaf1, leaf2], add);  // 17
  const node2: Node<number> = new Node([leaf1, leaf1], add);  // 12
  const root: Node<number> = new Node([node1, node2], ([v1, v2]) => v1 - v2); // 5
  root.output$.pipe(take(1)).subscribe(v => {
    expect(v).toBe(5);
  });
  node1.output$.pipe(skip(1), take(1)).subscribe(v => { // 
    expect(v).toBe(23);
  });  
  root.output$.pipe(skip(1), take(1)).subscribe(v => {
    expect(v).toBe(11);
    done();
  });
  node1.insert(leaf1);
});

