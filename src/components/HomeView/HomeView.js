import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./HomeView.scss";

const HomeView = props => {
  let mockData = props.tripViews;

  console.log(mockData);
  const [users, setUsers] = useState(mockData);

  // useEffect(() => {
  //   const getUser = () => {
  //     axios

  //       .get(`https://bd-trip-split.herokuapp.com/api/:username`)
  //       .then(response => {
  //         setUsers(response.data.results);
  //         console.log(response);
  //       })
  //       .catch(error => {
  //         console.error("this is an error", error);
  //       });
  //   };

  //   getUser();
  // }, []);

  return (
    <div className="container">
      <div className="button-container">
        <button>Add a trip!</button>
      </div>
      <div>
        {mockData.trips.map((user, key) => (
          <UserDetails
            key={key}
            username={user.username}
            destination={user.destination}
            date={user.date}
            active={user.active}
            num_people={user.num_people}
            // destination={user.destination}
            // date={user.date}
            // active={user.active}
          />
        ))}
      </div>
    </div>
  );
};

function UserDetails(props) {
  return (
    <div className="main-container">
      <div className="trips-container">
        <div>Welcome {props.username}</div>
        <div>
          <p>Destination: {props.destination}</p>
          <p>Date: {props.date.toString()}</p>
          <p>Active: {props.active}</p>
          <p>Number of People: {props.num_people}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tripViews: state.tripViews
  };
};

export default connect(
  mapStateToProps,
  {}
)(HomeView);
