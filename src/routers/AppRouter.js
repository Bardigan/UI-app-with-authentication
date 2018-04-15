import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import ExpenseLoginPage from '../components/ExpenseLoginPage';
import RegistrationPage from '../components/RegistrationPage';
import { connect } from 'react-redux';

const AppRouter = (props) => (
  <BrowserRouter>
    <div className={props.login ? "dashboardWrapper" : ''}>
      <div className={props.login ? "dashboardInnerWrapper" : ''}>
        {props.login ? <Header /> : ''}
        <Switch>
          <Route path='/' component={ExpenseLoginPage} exact={true} />
          <Route path='/registration' component={RegistrationPage} />
          <Route path='/home' component={ExpenseDashboardPage} />
          {props.login ? <Route path='/create' component={AddExpensePage} /> : ''}
          {props.login ? <Route path='/edit/:id' component={EditExpensePage} /> : ''}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

const mapStateToProps = (state) => {
  return {
    login: state.loginStatus.name
  }
}

export default connect(mapStateToProps)(AppRouter);