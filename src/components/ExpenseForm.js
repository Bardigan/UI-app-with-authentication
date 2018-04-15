import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import uuid from 'uuid';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      createdAt: moment(),
      calendarFocused: false,
      error: '',
      id: uuid()
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }))
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }))
    } else {
      this.setState(() => ({ error: '' }))

      const json = localStorage.getItem('info');
      const users = JSON.parse(json) === null ? [] : JSON.parse(json);      
      users.push({
        name: this.props.login,
        description: this.state.description,
        amount: this.state.amount,
        createdAt: this.state.createdAt.format("YY-MM-DD HH:mm"),
        id: this.state.id
      })      
      const toStrong = JSON.stringify(users);
      localStorage.setItem('info', toStrong);
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
//          autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
            className="addInput"
          />
          <input
            type="text"
            placeholder="Amount in $"
            value={this.state.amount}
            onChange={this.onAmountChange}
            className="addInput"
          />
          <div className="addButtonWrapper">
            <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div>
            <button className="addExpenseButton">Add Item</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.loginStatus.name
  }
}

export default connect(mapStateToProps)(ExpenseForm);