// import withReduxEnhancer from 'addon-redux/enhancer';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';

export function setup(id: any, rootReducer: any, allSaga: any, modulesSaga: any) {
  const sagaMiddleware = createSagaMiddleware();

  const createMiddlewareEnhancer = () => {
    const middleware: Array<Middleware> = [];
    middleware.push(sagaMiddleware);
    return middleware;
  };

  const createEnhancer = (): StoreEnhancer => {
    const enhancers: Array<StoreEnhancer> = [];

    const enhancerDevTools =
      process.env.NODE_ENV === "development" &&
      window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']({
        name: id,
        instance: id,
        serialize: true,
        trace: true,
        traceLimit: 2000,
      });

    if (enhancerDevTools) {
      enhancers.push(enhancerDevTools);
    }

    // enhancers.push(withReduxEnhancer);

    return compose(...enhancers);
  };

  const middlewareEnhancer = createMiddlewareEnhancer();
  const enhancer = createEnhancer();

  const middleware = enhancer
    ? compose(applyMiddleware(...middlewareEnhancer), enhancer)
    : applyMiddleware(...middlewareEnhancer);

  /* eslint-disable no-underscore-dangle */
  const store = createStore(combineReducers(rootReducer) /* preloadedState, */, middleware);
  /* eslint-enable */

  const rootSaga = function* () {
    yield all([call(allSaga)]);
  };

  sagaMiddleware.run(rootSaga);
  return store
}
