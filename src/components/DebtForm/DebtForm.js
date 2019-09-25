import React, { useState }  from 'react';
import { connect } from 'react-redux';

import { postData, updateDB } from '../../actions';

const DebtForm = (props) => {
  let expID = Number(props.match.params.expID);
  let expense = props.singleTrip.expenses.find(expense => expense.id === expID);
  let paidPersonID = expense.person_id;

  let pID = Number(props.match.params.debtID);
  let matchedDebt;
  if (pID) {
    matchedDebt = expense.debts.find(debt => debt.person_id === pID)
  }
  let initialState = (matchedDebt ? matchedDebt :  {person_id: "", amount: 0});
  let [debt, setDebt] = useState(initialState);

  const handleChange = event => {
    setDebt({...debt, [event.target.name]: event.target.value});
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (pID) {
      let newDebt = {amount: Number(debt.amount)}
      console.log(newDebt);
      props.updateDB(`/expenses/${expID}/debts/${pID}`, newDebt);
    } else if (debt.person_id) { 
      props.postData(`/expenses/${expID}/debts`, debt);
      props.history.push("/");
    } else {
      alert("Choose a person");
    }
  }

  return (
    <div>
      Debt Form
      <form onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
        <label>Person</label>
        {!pID &&
          <select name="person_id" defaultValue="-1">
            <option disabled value="-1">Select a person</option>
            {props.singleTrip.people.filter(person => person.id !== paidPersonID).map(person => <option value={person.id} name="person_id" >{person.first_name} {person.last_name}</option>)}
          </select>
        }
        {pID && 
          <select name="person_id" defaultValue={pID}>
            {props.singleTrip.people.filter(person => person.id === pID).map(person => <option value={person.id} name="person_id" >{person.first_name} {person.last_name}</option>)}
          </select>
        }
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
export default connect(mapStateToProps, { postData : postData, updateDB : updateDB })(DebtForm);