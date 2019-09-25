import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postData } from '../../actions';

const ExpenseForm = (props) => {
  let [expense, setExpense] = useState({name: "", amount: 0, person_name: ""});

  const handleChange = (event) => {
    console.log(expense);
    setExpense({...expense, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let tripID = props.match.params.tripID;
    let person = props.singleTrip.people.find(person => person.first_name.toLowerCase() === expense.person_name.trim().toLowerCase());
    if (expense.name && expense.amount && expense.person_name) {
      if (person) {
        props.postData(`/trips/${tripID}/expenses`, {name: expense.name, amount: expense.amount, person_id: person.id})
        props.history.push("/trips");
      } else {
        alert("Could not find person!");
      }
    }
  }
  return (
    <div>
      <h2>Add an expense</h2>
      <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)} >
        <label>
          Name of expense
        </label>
        <input type="text" placeholder="Expense" name="name" value={expense.name}/>
        <label>
          Cost
        </label>
        <input type="number" placeholder="Cost" name="amount" value={expense.count}/>
        <label>
          Who Paid
        </label>
        <input type="text" placeholder="Name" name="person_name" value={expense.person_name}/>
        <button>Add Expense</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip
  }
}
export default connect(mapStateToProps, {postData: postData})(ExpenseForm);