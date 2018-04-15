import React from 'react';
import { connect } from 'react-redux';
import EditForm from './EditForm';

const EditExpensePage = (props) => {

  return (
    <div className="editExpensePage">
      <EditForm
        selectedId={props.match.params.id}
        onSubmit={() => {
          props.history.push('/home');
        }}
      />
      <button className = "removeButton" onClick={() => {

        const json = localStorage.getItem('info');
        const users = JSON.parse(json) === null ? [] : JSON.parse(json);
        const validation = users.filter(user => user.id !== props.match.params.id);
        const toStrong = JSON.stringify(validation);
        localStorage.setItem('info', toStrong);
        props.history.push('/home');
        
      }}>Remove</button>
    </div>
  );
}

export default connect()(EditExpensePage);