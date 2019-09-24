import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postData } from '../../actions';

const PeopleForm = () => {
  let [nameInfo, setName] = useState({first_name: "", last_name: ""});
  
  const handleChange = (event) => {
    setName({...nameInfo, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(`/trips/${id}/people`, nameInfo);
  }

  return (
    <div>
      <h2>Who went on the trip?</h2>
      <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)}>
        <label>First Name</label>
        <input type="text" placeholder="first name" name="first_name"/>
        <label>Last Name</label>
        <input type="text" placeholder="lats name" name="last_name"/>
        <button>Add person</button>
      </form>
    </div>
  )

}

export default connect(null, {PeopleForm;