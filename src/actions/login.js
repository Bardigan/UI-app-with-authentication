export const loginAction = (loginInfo) => ({
  type: 'LOGIN',
  loginInfo
});

export const logOutAction = () => ({
  type: 'LOGOUT',
});