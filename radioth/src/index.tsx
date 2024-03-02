import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import {Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from '@reduxjs/toolkit';
import planReducer from './state/DataLoadingState';
import planPostingReducer from './state/DataPostingState'
import {watchLoadData, watchPostData, watchDeleteData, watchUpdateData} from './WatchServer';
import appStateReducer from './state/AppState';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    plans: planReducer,
    postPlans: planPostingReducer,
    app: appStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(function* rootSaga() {
  yield all([watchLoadData(), watchPostData(), watchDeleteData(), watchUpdateData()]);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
