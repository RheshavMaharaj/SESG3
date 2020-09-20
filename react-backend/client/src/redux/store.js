import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './features/loginSlice';

export default configureStore({
  reducer: {
    state: loginStatusReducer,
  },
});


