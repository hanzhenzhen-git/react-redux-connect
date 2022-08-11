
import { connect } from "http2";
import React, { PureComponent } from "react";

import { StoreContext } from "./context";

export function connect(mapStateToProps, mapDispachToProps) {
  return function enhanceHoc(WrappedComponent) {
    class EnhanceComponent extends PureComponent {
      constructor(props,context) {
        super(props,context);
        this.state = {
          storeState: mapStateToProps(context.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: this.context.getState()
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return <WrappedComponent {...props}
          {...mapStateToProps(this.context.getState())}
          {...mapDispachToProps(this.state.dispatch)}/>
      }
    }

    EnhanceComponent.contextType = StoreContext
    return EnhanceComponent
  }
}
