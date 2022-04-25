import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import setupSocket from './socket/socket';
import { sendCommandSaga } from './saga/sendCommand';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

const socket = setupSocket(store.dispatch);

sagaMiddleware.run(sendCommandSaga, { socket });

export type RootState = ReturnType<typeof rootReducer>;
