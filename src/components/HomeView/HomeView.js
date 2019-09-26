import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";

import "./HomeView.scss";
import { Button, Icon } from "antd";

const HomeView = props => {
  useEffect(() => {
    props.fetchUser(props.username);
  }, []);

  const redirect = link => {
    props.history.push(link);
  };

  return (
    <div className="container">
      <div className="button-container">
        <div className="welcomeUser">
          <h2>Hello {props.username}!</h2>
        </div>
        <Button
          type="primary"
          block
          className="addTrip add"
          onClick={() => redirect("/add")}
        >
          <Icon type="plus" />
          Add a trip!
        </Button>
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
          <p>Date: {props.date.toString().substring(0, 10)}</p>
          <p>Active: {props.active ? "Yes" : "No"}</p>
          <p>Number of People: {props.num_people}</p>
        </div>
        <div className="card-button">
          <div className="card-button-container1">
            <Button
              type="primary"
              block
              className="button-card"
              onClick={() => props.redirect(`/trips/${props.id}`)}
            >
              View More
            </Button>
          </div>
          <div className="card-button-container2">
            <Button
              type="danger"
              block
              className="button-card2"
              onClick={() => props.redirect(`/trips/${props.id}/edit`)}
            >
              <Icon type="edit" />
              Edit Trip
            </Button>
          </div>
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
