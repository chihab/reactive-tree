import React, { Component } from "react";
import { StoreContext } from "./Context";

class Provider extends Component {
  constructor(props) {
    super(props);
    const { store } = props;
    this.state = store;
  }

  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.store !== prevProps.store) {
  //     this.state.subscription.tryUnsubscribe()
  //     const subscription = new Subscription(this.props.store)
  //     subscription.onStateChange = this.notifySubscribers
  //     this.setState({ store: this.props.store, subscription })
  //   }
  // }

  render() {
    const Context = StoreContext;

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
