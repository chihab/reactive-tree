import React, { Component } from "react";
import { StoreContext } from "./Context";

class Node extends Component {
  state = {
    value: undefined
  };

  componentDidMount() {
    const { node } = this.props;
    this.sub = node.output$.subscribe(value => {
      this.setState({
        value,
        node
      });
    });
  }

  componentWillUnmount() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  render() {
    const { value, node } = this.state;
    return this.props.children({ value, node });
  }
}

class Consumer extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {store => {
          const node = this.props.node
            .split(".")
            .reduce((obj, key) => obj[key], store);
          if (node) {
            return (
              <StoreContext.Provider value={node}>
                <Node {...this.props} node={node} />
              </StoreContext.Provider>
            );
          } else {
            throw new Error("Wrong json path: " + this.props.node);
          }
        }}
      </StoreContext.Consumer>
    );
  }
}

// Consumer.contextType = StoreContext;

export default Consumer;
