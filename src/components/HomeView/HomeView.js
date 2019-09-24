import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from "axios";

import "./HomeView.scss";

const HomeView = (props) => {
  let mockData = props.tripViews;
  console.log(mockData);
  const [users, setUsers] = useState([{}]);

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
    <div>
      {users.map(user => (
        <UserDetails
          key={user.id}
          username={user.username}
          destination={user.destination}
          date={user.date}
          active={user.active}
        />
      ))}
    </div>
  );
};

function UserDetails({ username, destination, date, active }) {
  return (
    <div>
      <div>Welcome {username}</div>
      <div>
        Trips
        <p>Destination:{destination}</p>
        <p>Date:{date}</p>
        <p>Active:{active}</p>
        <p>Number of People:</p>
      </div>
      <div>Trip</div>
      <button>Add Trip</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tripViews: state.tripViews
  }
}

export default connect(mapStateToProps, {})(HomeView);
