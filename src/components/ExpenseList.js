import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import { Link } from 'react-router-dom';

class ExpenseList extends React.Component{

  printItems = (props) => {

    const json = localStorage.getItem('info');
    const users = JSON.parse(json) === null ? [] : JSON.parse(json);
    const validation = users.filter(user => user.name === this.props.login.name);   
    
    if (validation.length !== 0){
      
      return validation.map((expense) => {
        return <ExpenseListItem
          key={expense.id}
          {...expense}
        />
      })
    } else if (!this.props.login.name){
      return  <Link to="/">You are not logged in.</Link>
    }else {
      return 'no expenses'
    }    
  }

  render() {
    return (
      <div className="listOfItems">
        {this.printItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.loginStatus
  }
}


export default connect(mapStateToProps)(ExpenseList)