import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postData } from '../../actions';

const ExpenseForm = (props) => {
  let [expense, setExpense] = useState({name: "", amount: 0, person_name: ""});

  const handleChange = (event) => {
    setExpense({...expense, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let tripID = "0";
    let person = props.singleTrip.people.find(person => person.first_name === expense.person_name.trim());
    props.postData(`/trips/${tripID}/expenses`, {name: expense.name, amount: expense.amount, person_id: person.id})
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