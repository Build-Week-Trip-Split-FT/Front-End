import React, { useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";

import "./HomeView.scss";

const HomeView = props => {
  console.log(props.userTrips);
  useEffect(() => {
    props.fetchUser(props.username);
  }, []);

<<<<<<< HEAD
  const redirect = () => {
    props.history.push("/add");
  };
=======
  const redirect = (link) => {
    props.history.push(link);
  }
>>>>>>> 7d5fa018ad1917a7f958eac2a61fe8fa68af2f62

  return (
    <div className="container">
      <div className="welcomeUser">
        <h2>Welcome {props.username}!</h2>
      </div>
      <div className="button-container">
<<<<<<< HEAD
        <button className="addTrip" onClick={redirect}>
          Add a trip!
        </button>
=======
        <button onClick={() => redirect("/add")}>Add a trip!</button>
>>>>>>> 7d5fa018ad1917a7f958eac2a61fe8fa68af2f62
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
<<<<<<< HEAD
          <div style={{ width: "20vw", height: "20rem" }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBogHSf0D1ydBuNLDO0tYjZB_sN5r15Psw`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              destination={props.destination}
            />
          </div>
=======
          <button onClick={() => props.redirect(`/trips/${props.id}`)}>View More</button>
>>>>>>> 7d5fa018ad1917a7f958eac2a61fe8fa68af2f62
        </div>
        <p></p>
      </div>
    </div>
  );
}

function Map(props) {
  return (
    <GoogleMap
      defaultZoom={10}
      // defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultCenter={props.destination}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

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
