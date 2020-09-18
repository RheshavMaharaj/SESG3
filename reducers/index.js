const { combineReducers } = require("redux");

const initialState = { Login: false }

function loginChangeReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'CHANGE_LOGIN') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      Login: state.Login = true
    }
  }
  // otherwise return the existing state unchanged
  return state;
}

function loginStatusReducer(state = initialState.Login) {
  return state;
}

export const selectStatus = state => initialState.Login;

const rootReducer = combineReducers({
  loginChangeReducer,
  loginStatusReducer,
  selectStatus
})



export default rootReducer;