const filtersReducerDefaultState = {
   
};

export default (state = filtersReducerDefaultState, action) => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      name: action.loginInfo.name,
      password: action.loginInfo.password
    }
  }

  if (action.type === 'LOGOUT') {
    return {}
  }

  // default
  return state;
}