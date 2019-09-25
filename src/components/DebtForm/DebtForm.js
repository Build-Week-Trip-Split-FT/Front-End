import React, { useState }  from 'react';
import { connect } from 'react-redux';

import { postData } from '../../actions';

const DebtForm = (props) => {
  let [debt, setDebt] = useState({person_id: "", amount: 0})
  let expID = Number(props.match.params.expID);
  let expense = props.singleTrip.expenses.find(expense => expense.id === expID);
  let paidPersonID = expense.person_id;
  
  const handleChange = event => {
    console.log(event.target);
    setDebt({...debt, [event.target.name]: event.target.value.trim()});
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (debt.person_id) { 
      props.postData(`/expenses/${expID}/debts`, debt);
    } else {
      alert("Choose a person");
    }
  }
  return (
    <div>
      Debt Form
      <form onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
        <label>Person</label>
        <select name="person_id" defaultValue="0">
          <option disabled value="0">Select a person</option>
          {props.singleTrip.people.filter(person => person.id !== paidPersonID).map(person => <option value={person.id} name="person_id">{person.first_name} {person.last_name}</option>)}
        </select>
        <label>Amount</label>
        <input type="number" name="amount" value={debt.amount} />
        <button>Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
  }
}
export default connect(mapStateToProps, {postData : postData})(DebtForm);