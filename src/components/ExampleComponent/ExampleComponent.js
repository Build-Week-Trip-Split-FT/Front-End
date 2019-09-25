import React from 'react';
import { connect } from 'react-redux';

const ExampleComponent = (props) => {
  return (
    <div>
      Test
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userTrips: state.userTrips,
    singleTrip: state.singleTrip
  }
};
export default connect(mapStateToProps, {})(ExampleComponent); 