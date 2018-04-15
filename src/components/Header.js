import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutAction } from '../actions/login';

// MENU BAR

const Header = (props) => {

  return (
    <header>
      <NavLink to='/home' activeClassName='is-active' exact={true}>All Items</NavLink>
      <NavLink to='/create' activeClassName='is-active'>Add item</NavLink>
      <NavLink to='/' activeClassName='is-active'>Log out</NavLink>
    </header>
  );
}

export default connect()(Header);