import { createStore, combineReducers } from 'redux';

import login from '../reducers/login';

export default () => {
  const store = createStore(
    combineReducers({
      loginStatus: login
    }),
  );
  return store;
}