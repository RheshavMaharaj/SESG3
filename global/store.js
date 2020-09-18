
import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from '../reducers/index.js';
import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';

const store = createStore(rootReducer);

export default configureStore({
  reducer: {
    state: loginStatusReducer,
  },
});

console.log(store.getState());
