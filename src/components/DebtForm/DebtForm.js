import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';

import { postData, updateDB, deleteInfo } from "../../actions";
import { Button, Input, Tooltip, Icon, Dropdown, Menu } from "antd";



import styled from "styled-components";

const TripDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: white;
  align-items: center;
  width: 40%;
  border-radius: 15px;
`;

const AlignDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  margin-top: 25px;
  font-weight: bold;
`;

const NewForm = styled.form`
  width: 75%;
`;
const DebtForm = props => {
  
  useEffect(() => {
    if (props.changed) {
      let tripID = props.match.params.tripID;
      props.history.push(`/trips/${tripID}`)
    }
  }, [props.changed]);

  let expID = Number(props.match.params.expID);
  let expense = props.singleTrip.expenses.find(expense => expense.id === expID);
  let paidPersonID = expense.person_id;

  let pID = props.match.params.debtID;
  let matchedDebt;
  let status = pID ? "Edit" : "Add";
  if (pID) {
    pID = Number(pID);
    matchedDebt = expense.debts.find(debt => debt.person_id === pID);
  }

  let initialState = matchedDebt ? matchedDebt : { person_id: "", amount: 0 };
  let [debt, setDebt] = useState(initialState);

  const handleChange = event => {
    setDebt({ ...debt, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (pID) {
      let newDebt = { amount: Number(debt.amount) };
      props.updateDB(`/expenses/${expID}/debts/${pID}`, newDebt);
    } else if (debt.person_id) { 
      props.postData(`/expenses/${expID}/debts`, debt);
    } else {
      alert("Choose a person");
    }
  };

  const handleDelete = () => {
    let partial = `/expenses/${expID}/debts/${pID}`;
    props.deleteInfo(partial);
  }

  const backSubmit = event => {
    event.preventDefault();
    props.history.goBack();
  };
  
  return (
    <AlignDiv>
      <TripDiv>
        <div className="back-arrow">
          <p onClick={backSubmit}>
            <Icon type="arrow-left" />
          </p>
        </div>
        <Title>Debt Form</Title>
        <form onSubmit={e => handleSubmit(e)}>
          <label>Person</label>
          {!pID && (
            <select
              name="person_id"
              defaultValue="-1"
              onChange={e => handleChange(e)}
            >
              <option disabled value="-1">
                Select a person
              </option>
              {props.singleTrip.people
                .filter(person => person.id !== paidPersonID)
                .map(person => (
                  <option key={person.id} value={person.id} name="person_id">
                    {person.first_name} {person.last_name}
                  </option>
                ))}
            </select>
          )}
          {pID && (
            <select
              name="person_id"
              defaultValue={pID}
              onChange={e => handleChange(e)}
            >
              {props.singleTrip.people
                .filter(person => person.id === pID)
                .map(person => (
                  <option key={person.id} value={person.id} name="person_id">
                    {person.first_name} {person.last_name}
                  </option>
                ))}
            </select>
          )}
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={debt.amount}
            onChange={e => handleChange(e)}
          />
          <button>{status} Debt</button>
        </form>
        {matchedDebt && (
          <button onClick={() => handleDelete()}>Delete Entry</button>
        )}
      </TripDiv>
    </AlignDiv>
  );
};

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    changed: state.changed,
  }
}
export default connect(mapStateToProps, { postData : postData, updateDB : updateDB, deleteInfo : deleteInfo })(DebtForm);
