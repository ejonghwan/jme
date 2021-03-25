import { createWrapper } from "next-redux-wrapper";
import { compose, createStore, applyMiddleware } from 'redux'
import reducer from '../reducers/index.js'

import { composeWithDevTools } from 'redux-devtools-extension'

import React from 'react';

const configureStore = () => {

  const middleware = []
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware))

  const store = createStore(reducer, enhancer)
  return store
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development", //true면 디버거로 자세한 사항을 볼 수 있음
});

export default wrapper