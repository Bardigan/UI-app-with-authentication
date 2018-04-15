import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';

const AddExpensePage = (props) => {
  return (
    <div className="addExpensePage">
      <h1>Add Item</h1>
      <ExpenseForm
      onSubmit={() => {
        props.history.push('/home');
      }}
      />
    </div>
  );
}

export default connect()(AddExpensePage);