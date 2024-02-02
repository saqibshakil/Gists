import React from "react";
import {Provider } from "react-redux"

/**
 * A public higher-order component to access the imperative API
 */
function withProvider(store: any, context: any) {
    return (Component: any) => function WithProvider(props: any){
        return <Provider store={store} context={context} >
            <Component {...props}/>
      </Provider>
    }
}

export { withProvider }