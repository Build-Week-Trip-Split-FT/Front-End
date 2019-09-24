import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";

import "./HomeView.scss";

const HomeView = props => {
  console.log(props.userTrips);
  useEffect(() => {
    props.fetchUser(props.username);
  }, []);

  const redirect = () => {
    props.history.push("/add");
  };

  return (
    <div className="container">
      <h2>Welcome {props.username}</h2>
      <div className="button-container">
        <button className="addTrip" onClick={redirect}>
          Add a trip!
        </button>
      </div>
      {props.userTrips.trips && (
        <div>
          {props.userTrips.trips.map((user, key) => (
            <UserDetails
              key={key}
              username={user.username}
              destination={user.destination}
              date={user.date}
              active={user.active}
              num_people={user.num_people}
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
        </div>
      </div>
    </div>
  );
}

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
