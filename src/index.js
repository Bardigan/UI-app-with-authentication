import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import './styles/styles.css';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));