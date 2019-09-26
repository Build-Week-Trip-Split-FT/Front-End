import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';

import { postData, updateDB, deleteInfo } from "../../actions";
import { Button, Icon } from "antd";

import styled from "styled-components";
import './DebtForm.scss';

const TripDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: white;
  width: 25vw;
  border-radius: 20px;
  border: 1px solid lightgrey;
  padding: 1% 0 3% 0;
  box-shadow: -1px 15px 30px -12px black;
  justify-content: space-between;
`;

const AlignDiv = styled.div`
  display: flex;
  justify-content: center;
  margin:auto;
  margin-top:6%;
  font-size: 1.2rem;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align:center;
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
      <div className="back-arrow-container">
          <p className="back-arrow" onClick={backSubmit}>
            <Icon type="arrow-left" /> <span> View Trip</span>
          </p>
        </div>
        <Title>Debt Form</Title>
        <form className="debt-form">
          <div className="field">
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
          </div>
          <div className="field">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={debt.amount}
              className="number"
              onChange={e => handleChange(e)}
            />
          </div>
          <Button onClick={e => handleSubmit(e)} type="primary" className={pID ? 'edit' : 'add'}>{pID ? <Icon type="edit" /> : <Icon type="plus" />} {status} debt </Button>
          {matchedDebt && (
          <Button type="danger" onClick={() => handleDelete()}><Icon type="delete" />Delete Entry</Button>
        )}
        </form>
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
