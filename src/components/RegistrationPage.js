import React from 'react';
import { Link } from 'react-router-dom';

class RegistrationPage extends React.Component {
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

  //test
  onRegistration = () => {
    const json = localStorage.getItem('users');
    const users = JSON.parse(json) === null ? [] : JSON.parse(json);
    const validation = users.filter(user => user.name === this.state.name);
    return validation;
  }

  onSubmitRegistration = (e) => {
    e.preventDefault();
    let usersEx = this.onRegistration();
    if (!this.state.name || !this.state.password) {
      this.setState(() => ({ error: 'Please provide name and password.' }))
    } else {
      this.setState(() => ({ error: '' }));
      const newUser = { name: this.state.name, password: this.state.password };
      const loadedUsers = this.state.users;

      if (usersEx.length !== 0) {
        return this.setState(() => ({ error: 'This name is taken.' }))
      }
      loadedUsers.push(newUser)
      const createNewUser = JSON.stringify(loadedUsers);
      localStorage.setItem('users', createNewUser);
      this.props.history.push('/');
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
        <div className="innerWrapperAdd">
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmitRegistration}>
            <input
              type="text"
              placeholder="Name..."
              onChange={this.onNameChange} 
              className="form-input"/>
            <input
              type="text"
              placeholder="Password..."
              onChange={this.onPasswordChange}
              className="form-input"
            />
            <button>Sign up</button>
          </form>
          <Link to="/">to login page</Link>
        </div>
      </div>

    );
  }
}

export default RegistrationPage;