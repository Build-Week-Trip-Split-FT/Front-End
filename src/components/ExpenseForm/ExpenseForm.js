import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import { postData, updateDB, deleteInfo } from "../../actions";

const ExpenseForm = props => {
  let expID = Number(props.match.params.expID);
  let matchedExp;

  if (expID) {
    matchedExp = props.singleTrip.expenses.find(
      expense => expense.id === expID
    );
  }

  let initialState = matchedExp
    ? matchedExp
    : { name: "", amount: 0, person_id: -1 };
  let [expense, setExpense] = useState(initialState);

  const handleChange = event => {
    console.log(expense);
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let tripID = props.match.params.tripID;
    if (expID) {
      let newExpense = {
        person_id: expense.person_id,
        name: expense.name,
        amount: expense.amount
      };
      props.updateDB(`/expenses/${expID}`, newExpense);
      props.history.push("/trips");
    } else if (!expense.person_id) {
      alert("Please choose someone");
    } else {
      console.log(expense);
      props.postData(`/trips/${tripID}/expenses`, expense);
      props.history.push("/trips");
    }
  };

  const handleDelete = () => {
    let partial = `/expenses/${expID}`;
    props.deleteInfo(partial);
    props.history.push("/trips");
  };

  const backSubmit = event => {
    event.preventDefault();
    props.history.goBack();
  };

  return (
    <div>
      <div className="back-arrow">
        <p onClick={backSubmit}>
          <Icon type="arrow-left" />
        </p>
      </div>
      <h2>Add an expense</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Name of expense</label>
        <input
          type="text"
          placeholder="Expense"
          name="name"
          onChange={e => handleChange(e)}
          value={expense.name}
        />
        <label>Cost</label>
        <input
          type="number"
          placeholder="Cost"
          name="amount"
          onChange={e => handleChange(e)}
          value={expense.amount}
        />
        <label>Who Paid</label>
        <select
          name="person_id"
          defaultValue={expense.person_id}
          onChange={e => handleChange(e)}
        >
          <option disabled value="-1">
            Select a person
          </option>
          {props.singleTrip.people.map(person => (
            <option key={person.id} value={person.id} name="person_id">
              {person.first_name} {person.last_name}
            </option>
          ))}
        </select>
        <button>Add Expense</button>
      </form>
      {matchedExp && (
        <button onClick={() => handleDelete()}>Delete Entry</button>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip
  };
};
export default connect(
  mapStateToProps,
  { postData: postData, updateDB: updateDB, deleteInfo: deleteInfo }
)(ExpenseForm);
