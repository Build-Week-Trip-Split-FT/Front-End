import React from 'react';
import { connect } from 'react-redux';

import { togglePaid } from '../../actions';

import styles from './ExampleComponent.module.scss';

const ExampleComponent = ({ currentData, togglePaid }) => {
  let trip = currentData; 
  return (
    <div className={styles.app}>
      This is an example component!
      <h2>Event</h2>
      <p>Name: {trip.name} </p>
      <div>
        Paid
        {trip.people.filter(person => person.paid).map(person => <p>{person.name}<button onClick={() => togglePaid(person, trip.people)}>X</button></p>)}
        Not Paid
        {trip.people.filter(person => !person.paid).map(person => <p>{person.name}<button onClick={() => togglePaid(person, trip.people)}>X</button></p>)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentData: state.currentData,
  }
};
export default connect(mapStateToProps, {togglePaid: togglePaid})(ExampleComponent); 