import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

const TripView = (props) => {
  return (
    <div>Hey</div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
  }
};

export default connect(mapStateToProps, {fetchData: fetchData})(TripView);