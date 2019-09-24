import React from 'react';
import { connect } from 'react-redux';
import { togglePaid, setEvent } from '../../actions';

const ExampleComponent = ({ currentData, singleTrip, togglePaid, setEvent }) => {
  return (
    <div>
      <p>Destination: {singleTrip.destination}</p>
      <p>Expenses</p>

      {singleTrip.expenses &&  
      <div>
        {singleTrip.expenses.map(expense => 
        <div>
          <h1>{expense.name}</h1>
          <h2>Paid</h2>
          {expense.debts.filter(person => person.amount === 0).map(person => 
            <div>
              {person.person_name}
              <button onClick={() => togglePaid(person,expense,singleTrip)}>x</button>
            </div>
            )}
          <h2>Unpaid</h2>
          {expense.debts.filter(person => person.amount !== 0).map(person => 
            <div>
              {person.person_name}
              <button onClick={() => togglePaid(person,expense,singleTrip)}>x</button>
            </div>
          )}
        </div>
        )}
      </div>}
      {/* This is an example component!
      <h2>Event</h2>
      <p>Name: {singleTrip.name} </p>
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
    singleTrip: state.singleTrip
  }
};
export default connect(mapStateToProps, {togglePaid: togglePaid})(ExampleComponent); 