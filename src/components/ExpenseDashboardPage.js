import React from 'react';
import ExpenseList from './ExpenseList';
import { connect } from 'react-redux';

const ExpenseDashboardPage = (props) => {
  return (
    <div className="ExpenseDashboardPage">
      <h3 className="greeting">{props.login ? `${props.login}` : ''}</h3>
      <ExpenseList />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.loginStatus.name
  }
}

export default connect(mapStateToProps)(ExpenseDashboardPage);