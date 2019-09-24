import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTrip } from '../../actions';

const TripView = (props) => {
  let singleTrip = props.singleTrip;
  console.log(singleTrip);
  useEffect(() => {
    let id = props.match.params.tripID
    props.fetchTrip(id);
  }, []);
  
  const redirect = (type) => {
    props.history.push(`/trips/${props.match.params.tripID}/add/${type}`);
  }
  return (
    <div>
      <h2>{singleTrip.destination}</h2>
      <p>Date of Trip: {singleTrip.date.substring(0,10)}</p>
      <p>Active: {singleTrip.active ? "Yes" : "No"}</p>
      <p> 
        Attendees:
          {singleTrip.people.map(person=> 
            (<div>
              {person.first_name} {person.last_name}
            </div>
            ))}
      </p>
      <p> 
        Expenses:
          {singleTrip.expenses.map(expense=> 
            (<div>
              {expense.amount} paid by {expense.person_name}
            </div>
            ))}
      </p>
      <button onClick={() => redirect("person")}>Add Person</button>
      <button onClick={() => redirect("expense")}>Add Expense</button>
      <button>Save Changes</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    username: state.username,
  }
};

export default connect(mapStateToProps, {fetchTrip: fetchTrip})(TripView);