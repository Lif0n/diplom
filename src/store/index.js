import { applyMiddleware, combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config = {}) {
  // return createStore(combineReducers(reducers), undefined, applyMiddleware(
  //   thunk.withExtraArgument(services)
  // ));
  return configureStore({
    reducer: combineReducers(reducers),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: services
        }
      }),
  });
}
