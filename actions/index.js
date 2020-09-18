
let trackLoginState = false;

export const trackLogin = Login => ({
  type: 'CHANGE_LOGIN',
  payload: Login
})