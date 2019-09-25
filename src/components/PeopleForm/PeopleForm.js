import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postData, updateDB } from '../../actions';

const PeopleForm = (props) => {
  let tripID = props.match.params.tripID;
  let pID = props.match.params.pID;
  let matchedPerson;
  let status = (pID ? "Edit" : "Add");

  if (pID) {
      matchedPerson = props.singleTrip.people.find(person => Number(pID) === person.id);
  }

  let initialState = (matchedPerson ? matchedPerson : {first_name: "", last_name: ""});

  let [nameInfo, setName] = useState(initialState);
  
  const handleChange = (event) => {
    setName({...nameInfo, [event.target.name]: event.target.value.trim()})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pID){
      props.postData(`/trips/${tripID}/people`, nameInfo);
    } else {
      let newPerson = {first_name: nameInfo.first_name, last_name: nameInfo.last_name};
      props.updateDB(`/people/${pID}`, newPerson);
    }
    props.history.push("/trips");
  }

  return (
    <div>
      <h2>{status} person</h2>
      <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)}>
        <label>First Name</label>
        <input type="text" placeholder="first name" name="first_name" value={nameInfo.first_name}/>
        <label>Last Name</label>
        <input type="text" placeholder="last name" name="last_name" value={nameInfo.last_name}/>
        <button>{status} person</button>
      </form>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
  }
}
export default connect(mapStateToProps, {postData:postData, updateDB: updateDB})(PeopleForm);