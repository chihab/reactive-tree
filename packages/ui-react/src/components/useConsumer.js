import { useState, useContext, useEffect, useRef } from "react";
import { StoreContext } from "./Context";

function useNode(node) {
  // const [sub, setSub] = useRef();
}

function useConsumer(nodePath) {
  const store = useContext(StoreContext);
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    const node = nodePath.split(".").reduce((obj, key) => obj[key], store);
    const sub = node.output$.subscribe(
      value => {
        setState({
          value,
          node,
          loading: false
        });
      }
    );
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, []);
  return [state];
}

export { useConsumer, useNode };
