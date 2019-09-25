import React, { useEffect } from "react";
// import {GoogleMap} from 'react-google-maps';
import { connect } from "react-redux";

import { fetchUser } from "../../actions";

import "./HomeView.scss";

const HomeView = props => {
  
  useEffect(() => {
    props.fetchUser(props.username);
  }, []);

  const redirect = (link) => {
    props.history.push(link);
  }

  return (
    <div className="container">
      <div className="welcomeUser">
        <h2>Welcome {props.username}!</h2>
      </div>
      <div className="button-container">
        <button onClick={() => redirect("/add")}>Add a trip!</button>
      </div>
      {props.userTrips.trips && (
        <div>
          {props.userTrips.trips.map((user, key) => (
            <UserDetails
              key={key}
              id={user.id}
              username={user.username}
              destination={user.destination}
              date={user.date}
              active={user.active}
              num_people={user.num_people}
              redirect={redirect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function UserDetails(props) {
  return (
    <div className="main-container">
      <div className="trips-container">
        <div>
          <p>Destination: {props.destination}</p>
          <p>Date: {props.date.toString()}</p>
          <p>Active: {props.active ? "Yes" : "No"}</p>
          <p>Number of People: {props.num_people}</p>
          <button onClick={() => props.redirect(`/trips/${props.id}`)}>View More</button>
          <button onClick={() => props.redirect(`/trips/${props.id}/edit`)}>Edit Information</button>
        </div>
        <p></p>
      </div>
    </div>
  );
}


// function Map() {
//   return (

//   )
// }

const mapStateToProps = state => {
  return {
    userTrips: state.userTrips,
    username: state.username
  };
};

export default connect(
  mapStateToProps,
  { fetchUser: fetchUser }
)(HomeView);
