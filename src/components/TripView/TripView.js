import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTrip } from '../../actions';

const TripView = (props) => {
  let singleTrip = props.singleTrip;
  useEffect(() => {
    let id = props.match.params.tripID;
    props.fetchTrip(id);
  }, []);
  
  const redirect = (type) => {
    props.history.push(`/trips/${props.match.params.tripID}${type}`);
  }
  return (
    <>
    {singleTrip &&<div>
      <h2>{singleTrip.destination}</h2>
      <p>Date of Trip: {singleTrip.date.substring(0,10)}</p>
      <p>Active: {singleTrip.active ? "Yes" : "No"}</p>
      <div> 
        <p>Attendees:</p>
          {singleTrip.people.map(person=> 
            (<div key={person.id}>
              {person.first_name} {person.last_name}
            </div>
            ))}
      </div>
      <div> 
        <p>Expenses:</p>
          {singleTrip.expenses.map(expense=> 
            (<div key={expense.id}>
              {expense.name}: {expense.amount} paid by {expense.person_name}
              <ul>
                {expense.debts.map(debt => 
                  <li key={debt.person_id}>{debt.person_name} owes {debt.amount} dollars</li>  
                )}
              </ul>
              {singleTrip.expenses.length > 0  && <button onClick={() => redirect(`/${expense.id}/add`)}>Add Debt</button>}
            </div>
            ))}
      </div>
      <button onClick={() => redirect("/add/person")}>Add Person</button>
      {singleTrip.people.length > 0 && <button onClick={() => redirect("/add/expense")}>Add Expense</button>}
    </div>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    username: state.username,
  }
};

export default connect(mapStateToProps, {fetchTrip: fetchTrip})(TripView);