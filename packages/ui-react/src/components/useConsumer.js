import { useState, useContext, useEffect, useRef } from 'react';
import { StoreContext } from "./Context";

function useNode(node) {
  // const [sub, setSub] = useRef();

}


function useConsumer(nodePath) {
  const store = useContext(StoreContext);
  const node = nodePath
    .split(".")
    .reduce((obj, key) => obj[key], store)
  const [state, setState] = useState({ value: undefined });
  useEffect(() => {
    const sub = node.output$.subscribe(value => {
      setState({
        value,
        node
      });
    }, [nodePath]);
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  });
  return [state];
}

export { useConsumer, useNode };