import {
  applyMiddleware,
  compose,
  createStore,
  GenericStoreEnhancer,
  Middleware,
} from 'redux';
import { History } from 'history';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { default as reducers, State } from './reducers';
import rootSagas from './sagas';
const ReduxExtentionComposeName: string = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const sagaMiddleWare = createSagaMiddleware();

export default function configureStore(
  history: History,
) {
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window[ReduxExtentionComposeName]
    ? window[ReduxExtentionComposeName]
    : compose;
  const middlewares: Middleware[] = [
    routerMiddleware(history),
    sagaMiddleWare,
  ];
  const enhancers: GenericStoreEnhancer[] = [
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ];
  const store = createStore<State>(
    reducers,
    composeEnhancers(...enhancers),
  );
  persistStore(store);
  sagaMiddleWare.run(rootSagas);
  return store;
}