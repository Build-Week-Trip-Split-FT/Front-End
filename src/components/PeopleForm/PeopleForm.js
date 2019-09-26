import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "antd";
import "./PeopleForm.scss";

import { postData, updateDB, deleteInfo } from "../../actions";

const PeopleForm = props => {
  let tripID = props.match.params.tripID;
  let pID = props.match.params.pID;
  let matchedPerson;
  let status = pID ? "Edit" : "Add";

  useEffect(() => {
    if (props.changed) {
      props.history.push(`/trips/${tripID}`)
    }
  }, [props.changed])

  if (pID) {
    matchedPerson = props.singleTrip.people.find(
      person => Number(pID) === person.id
    );
  }

  let initialState = matchedPerson
    ? matchedPerson
    : { first_name: "", last_name: "" };

  let [nameInfo, setName] = useState(initialState);

  const handleChange = event => {
    setName({ ...nameInfo, [event.target.name]: event.target.value.trim() });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!pID) {
      props.postData(`/trips/${tripID}/people`, nameInfo);
    } else {
      let newPerson = {
        first_name: nameInfo.first_name,
        last_name: nameInfo.last_name
      };
      props.updateDB(`/people/${pID}`, newPerson);
    }
  };

  const handleDelete = () => {
    let partial = `/people/${pID}`;
    props.deleteInfo(partial);
  };

  const backSubmit = event => {
    event.preventDefault();
    props.history.goBack();
  };

  return (
    <div className="people-container">
      <div className="people-card">
        <div className="back-arrow-container">
          <p className="back-arrow" onClick={backSubmit}>
            <Icon type="arrow-left" /> <span> View Trip</span>
          </p>
        </div>
        <h2>Who went on the trip?</h2>
        <form>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="first name"
              name="first_name"
              value={nameInfo.first_name}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="last name"
              name="last_name"
              value={nameInfo.last_name}
              onChange={e => handleChange(e)}
            />
          </div>
          <Button onClick={e => handleSubmit(e)} type="primary" className={pID ? 'edit' : 'add'}>{pID ? <Icon type="edit" /> : <Icon type="plus" />} {status} person </Button>
          {pID && <Button type="danger" onClick={() => handleDelete()}><Icon type="delete" />Delete Entry</Button>}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    changed: state.changed,
  }
}

export default connect(
  mapStateToProps,
  { postData: postData, updateDB: updateDB, deleteInfo: deleteInfo }
)(PeopleForm);
