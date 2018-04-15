import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import uuid from 'uuid';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      createdAt: moment(),
      calendarFocused: false,
      error: '',
      id: uuid(),
    };
  }

  componentDidMount() {
    const selectedId = this.props.selectedId;
    const json = localStorage.getItem('info');
    const users = JSON.parse(json) === null ? [] : JSON.parse(json);
    const validation = users.filter(user => user.id === selectedId);
    this.setState(() => {
      return {
        description: validation[0].description,
        amount: validation[0].amount
      }
      
    })

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

      const updated = users.map((user) => {
        if (user.id === this.props.selectedId) {
          return {
            name: this.props.login,
            description: this.state.description,
            amount: this.state.amount,
            createdAt: this.state.createdAt.format("YY-MM-DD HH:mm"),
            id: this.state.id
          }
        } else {
          return user
        }
      })
      const toString = JSON.stringify(updated);
      localStorage.setItem('info', toString);
      this.props.onSubmit();

    }
  }

  render() {
    return (
      <div>
        <h1>Edit Item</h1>
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit} className="editForm">
            <input
              type="text"
              placeholder='Description'
//            autoFocus
              value={this.state.description}
              onChange={this.onDescriptionChange}
              className="addInput"
            />
            <input
              type="text"
              placeholder='Amount'
              value={this.state.amount}
              onChange={this.onAmountChange}
              className="addInput"
            />
            <div className="editWrapper">
              <SingleDatePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
              <button className="editExpenseButton">Edit Item</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.loginStatus.name
  }
}

export default connect(mapStateToProps)(EditForm);