import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button, Icon, Input } from 'antd';
import { addTrip, updateTrip, deleteTrip } from '../../actions';

import './AddTrip.scss';
import styled from "styled-components";

//  START OF STYLED COMPONENTS

const TripDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-content: center;
  background-color: white;
  align-items: center;
  width: 25vw;
  height: 250px;
  border-radius: 20px;
  padding: 1% 0 3% 0;
  box-shadow: -1px 15px 30px -12px black;
  @media (max-width: 500px) {
      width: 70%;
  }
`;

const AlignDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top:6%;
`;

const Title = styled.h2`
  font-weight: bold;
`;

const NewForm = styled.form`
  text-align: center;
`

//END OF STYLED COMPONENTS

const AddTrip = props => {
  let id = props.match.params.tripID;
  let matchedTrip;
  let status = id ? "Edit" : "Add";

  if (id) {
    matchedTrip = props.userTrips.trips.find(trip => Number(id) === trip.id);
    matchedTrip.date = matchedTrip.date.substring(0, 10);
  }

  let initialState = matchedTrip
    ? matchedTrip
    : {
        username: props.username,
        destination: "",
        date: new Date().toJSON().substring(0, 10),
        active: true
      };

  let [trip, setTrip] = useState(initialState);

  const handleChange = e => {
    if (e.target.name === "active") {
      setTrip({ ...trip, active: !trip.active });
    } else {
      setTrip({ ...trip, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (id) {
          props.updateTrip(`/trips/${id}`, trip)
      } else {
          props.addTrip(trip);
      }
      props.history.push('/trips');
  }

  const handleDelete = () => {
      let partial = `/trips/${id}`;
      props.deleteTrip(partial, Number(id));
      props.history.push("/trips");
  }

  const backSubmit = event => {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    <AlignDiv>
     <TripDiv>
        <div className="back-arrow-container">
          <p className="back-arrow" onClick={backSubmit}>
            <Icon type="arrow-left" /> <span> View Trip</span>
          </p>
        </div>
        <Title>{status} a Trip!</Title>
        <NewForm className="trip-form-form">
          <Input
            type="text"
            name="destination"
            placeholder="Add Destination"
            value={trip.destination}
            onChange={e => handleChange(e)}
            style={{ width: "100%", marginTop: 5 }}
          />
          <Input
            type="date"
            name="date"
            placeholder="Insert Date"
            value={trip.date}
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={e => handleChange(e)}
          />
          <div>
            <label>Active Trip: </label>
            <input
              type="checkbox"
              name="active"
              checked={trip.active}
              onChange={e => handleChange(e)}
            />
          </div>
          <Button onClick={e => handleSubmit(e)}  type="primary" className={id ? 'edit' : 'add'}>{id ? <Icon type="edit" /> : <Icon type="plus" />} {status} Trip </Button>
        {id && (
          <Button type="danger" onClick={() => handleDelete()}><Icon type="delete" />Delete Entry</Button>
        )}
        </NewForm>
    </TripDiv>
  </AlignDiv>
  );
};

const mapStateToProps = state => {
  return {
    userTrips: state.userTrips,
    username: state.username
  };
};
export default connect(
  mapStateToProps,
  { addTrip: addTrip, updateTrip: updateTrip, deleteTrip: deleteTrip }
)(AddTrip);
