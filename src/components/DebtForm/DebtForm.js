import React, { useState }  from 'react';
import { connect } from 'react-redux';

import { postData, updateDB, deleteInfo } from '../../actions';

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
      props.updateDB(`/expenses/${expID}/debts/${pID}`, newDebt);
      props.history.push("/trips");
    } else if (debt.person_id) { 
      props.postData(`/expenses/${expID}/debts`, debt);
      props.history.push("/trips");
    } else {
      alert("Choose a person");
    }
  }

  const handleDelete = () => {
    let partial = `/expenses/${expID}/debts/${pID}`;
    props.deleteInfo(partial);
    props.history.push("/trips");
  }

  return (
    <div>
      Debt Form
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Person</label>
        {!pID &&
          <select name="person_id" defaultValue="-1">
            <option disabled value="-1" onChange={(e) => handleChange(e)}>Select a person</option>
            {props.singleTrip.people.filter(person => person.id !== paidPersonID).map(person => 
              <option value={person.id} name="person_id" onChange={(e) => handleChange(e)}>
                {person.first_name} {person.last_name}
              </option>)}
          </select>
        }
        {pID && 
          <select name="person_id" defaultValue={pID}>
            {props.singleTrip.people.filter(person => person.id === pID).map(person => 
              <option key={person.id} value={person.id} name="person_id" onChange={(e) => handleChange(e)}>
                {person.first_name} {person.last_name}
              </option>)}
          </select>
        }
        <label>Amount</label>
        <input type="number" name="amount" value={debt.amount} onChange={(e) => handleChange(e)}/>
        <button>Submit</button>
      </form>
      {matchedDebt && <button onClick={() => handleDelete()}>Delete Entry</button>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
  }
}
export default connect(mapStateToProps, { postData : postData, updateDB : updateDB, deleteInfo : deleteInfo })(DebtForm);