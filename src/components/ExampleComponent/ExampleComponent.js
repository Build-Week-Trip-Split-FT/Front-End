import React from 'react';
import { connect } from 'react-redux';

import { togglePaid } from '../../actions';

const ExampleComponent = ({ currentData, togglePaid }) => {
  let trip = currentData[0];
  console.log(trip);
  return (
    <div>
      <p>Destination: {trip.destination}</p>
      <p>Expenses</p>
      {trip.expenses.map(expense => 
        <div>
          <h1>{expense.name}</h1>
          <h2>Paid</h2>
          {expense.debts.filter(person => person.amount === 0).map(person => 
            <div>
              {person.person_name}
              <button onClick={togglePaid}>x</button>
            </div>
            )}
          <h2>Unpaid</h2>
          {expense.debts.filter(person => person.amount !== 0).map(person => 
            <div>
              {person.person_name}
              <button>x</button>
            </div>
            )}
        </div>
      )}
      {/* This is an example component!
      <h2>Event</h2>
      <p>Name: {trip.name} </p>
      <div>
        Paid
        {trip.people.filter(person => person.paid).map(person => <p>{person.name}<button onClick={() => togglePaid(person, trip.people)}>X</button></p>)}
        Not Paid
        {trip.people.filter(person => !person.paid).map(person => <p>{person.name}<button onClick={() => togglePaid(person, trip.people)}>X</button></p>)}
      </div> */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentData: state.currentData,
  }
};
export default connect(mapStateToProps, {togglePaid: togglePaid})(ExampleComponent); 