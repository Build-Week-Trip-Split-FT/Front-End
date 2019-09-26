import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "antd";
import { postData, updateDB, deleteInfo } from "../../actions";

import './ExpenseForm.scss';

const ExpenseForm = props => {
  useEffect(() => {
    if (props.changed) {
      let tripID = props.match.params.tripID;
      props.history.push(`/trips/${tripID}`)
    }
  }, [props.changed]);
  let expID = Number(props.match.params.expID);
  let matchedExp;
  let status = expID ? "Edit" : "Add";
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
    } else if (!expense.person_id) {
      alert("Please choose someone");
    } else {
      props.postData(`/trips/${tripID}/expenses`, expense);
    }
  };

  const handleDelete = () => {
    let partial = `/expenses/${expID}`;
    props.deleteInfo(partial);
  }

  const backSubmit = event => {
    event.preventDefault();
    props.history.goBack();
  };

  return (
    <div className="expense-form-container">
      <div className="expense-form-card">
      <div className="back-arrow-container">
          <p className="back-arrow" onClick={backSubmit}>
            <Icon type="arrow-left" /> <span> View Trip</span>
          </p>
        </div>
        <h2>Add an expense</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="field">
            <label>Name of expense</label>
            <input
              type="text"
              placeholder="Expense"
              name="name"
              onChange={e => handleChange(e)}
              value={expense.name}
            />
          </div>
          <div className="field">
            <label>Cost</label>
            <input
              type="number"
              placeholder="Cost"
              name="amount"
              onChange={e => handleChange(e)}
              value={expense.amount}
            />
          </div>
          <div className="field">
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
          </div>
          <Button onClick={e => handleSubmit(e)} type="primary" className={expID ? 'edit' : 'add'}>{expID ? <Icon type="edit" /> : <Icon type="plus" />} {status} expense </Button>
          {matchedExp && (
            <Button type="danger" onClick={() => handleDelete()}><Icon type="delete" />Delete Entry</Button>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    changed: state.changed,
  }
}
export default connect(mapStateToProps, {postData : postData, updateDB : updateDB, deleteInfo : deleteInfo})(ExpenseForm);
