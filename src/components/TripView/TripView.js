import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTrip } from '../../actions';

const TripView = (props) => {
  useEffect(() => {
    let id = props.match.params("tripID");
    props.fetchTrip(id);
  }, []);
  
  return (
    <div>Hey</div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    username: state.username,
  }
};

export default connect(mapStateToProps, {fetchTrip: fetchTrip})(TripView);