import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'loginstatus',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    Login: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = true;
    },
    Logout: state => {
      state.isLoggedIn = false;
    }
  }
})

export const { Login, Logout } = loginSlice.actions;

console.log(loginSlice.actions.Login());

export const selectStatus = state => state.state.isLoggedIn;

export default loginSlice.reducer;