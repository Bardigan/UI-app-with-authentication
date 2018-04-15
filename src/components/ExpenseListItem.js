import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ dispatch, id, description, createdAt, amount }) => {

  return (
    <div className="listItemWrapper">
      <div className="listItem">
        <Link to={`/edit/${id}`} className="listItemLink">
          <div className = "descriptionAmount">
            <div className="description">{description}</div>
            <div className="amount"> {amount}</div>
            <p>{createdAt}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default connect()(ExpenseListItem);