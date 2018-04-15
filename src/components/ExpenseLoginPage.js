import React from 'react';
import { Link } from 'react-router-dom';
import { loginAction,logOutAction } from '../actions/login';
import { connect } from 'react-redux';

class ExpenseLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      error: '',
      users: []
    }
  }

  componentDidMount() {
    this.props.dispatch(logOutAction())
    const json = localStorage.getItem('users');
    const parseJson = JSON.parse(json);
    if (parseJson) {
      this.setState(() => {
        return {
          users: this.state.users.concat(parseJson)
        }
      })
    } else {
      this.setState(() => {
        return {
          users: []
        }
      })
    }
  }

  //pick one which matches state
  onRegistration = () => {
    const json = localStorage.getItem('users');
    const users = JSON.parse(json) === null ? [] : JSON.parse(json);
    const validation = users.filter(user => user.name === this.state.name && user.password === this.state.password);
    return validation;
  }

  onSubmitRegistration = (e) => {
    e.preventDefault();
    let usersEx = this.onRegistration();

    if (!this.state.name || !this.state.password) {
      this.setState(() => ({ error: 'Please provide name and password.' }))
    } else {
      this.setState(() => ({ error: '' }));
      if (usersEx.length !== 0) {
        console.log('logged in')
        this.props.dispatch(loginAction({ name: this.state.name, password: this.state.password }))
        this.props.history.push('/home');
      } else {
        this.setState(() => ({ error: 'This username or password is incorrect.' }))
      }
    }
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }))
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }))
  }

  render() {
    return (
      <div className="loginWraper">
        <div className="innerWrapper">
          {this.state.error && <p>{this.state.error}</p>}
          <h1>Expensify</h1>
          <form onSubmit={this.onSubmitRegistration}>
            <input
              type="text"
              placeholder="Name..."
              onChange={this.onNameChange}
              className="form-input" />
            <input
              type="text"
              placeholder="Password..."
              onChange={this.onPasswordChange}
              className="form-input"
            />
            <button>Sign in</button>
          </form>
          <div className= "registrationPageLinkWrapper">
            <Link to="/registration">to registration page</Link>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToPtops = (state) => {
  return {
    login: state.loginStatus
  }
}

export default connect(mapStateToPtops)(ExpenseLoginPage);

