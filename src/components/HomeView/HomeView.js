import React, { useEffect } from "react";
// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchUser } from "../../actions";

import "./HomeView.scss";

const MainDiv = styled.div`
  width: 100%;
`;

const HomeView = props => {
  console.log(props.userTrips);
  useEffect(() => {
    props.fetchUser(props.username);
  }, []);

  const redirect = link => {
    props.history.push(link);
  };

  return (
    <div className="container">
      <div className="welcomeUser">
        <h2>Hello {props.username}!</h2>
      </div>
      <div className="button-container">
        <button className="addTrip" onClick={() => redirect("/add")}>
          Add a trip!
        </button>
      </div>
      {props.userTrips && (
        <div className="wrapper">
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
        <div className="content-details">
          <div className="destination">
            <p>Destination: {props.destination}</p>
          </div>
          <p>Date: {props.date.toString()}</p>
          <p>Active: {props.active ? "Yes" : "No"}</p>
          <p>Number of People: {props.num_people}</p>
          {/* <div style={{ width: "20vw", height: "20rem" }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBogHSf0D1ydBuNLDO0tYjZB_sN5r15Psw`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              destination={props.destination}
            />
          </div> */}
        </div>
        <div className="card-button">
          <div className="card-button-container1">
            <button
              className="button-card"
              onClick={() => props.redirect(`/trips/${props.id}`)}
            >
              View More
            </button>
          </div>
          <div className="card-button-container2">
            <button
              className="button-card"
              onClick={() => props.redirect(`/trips/${props.id}/edit`)}
            >
              Edit Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// function Map(props) {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       // defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
//       defaultCenter={props.destination}
//     />
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

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
