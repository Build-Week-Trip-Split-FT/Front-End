import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTrip } from "../../actions";
import { Button, Icon, Dropdown, Menu } from "antd";
import TotalPrice from "../TotalPrice";

import "./TripView.scss";
import styled from "styled-components";

const AlignDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  margin-right: 5%;
`;

const TripDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-content: center;
  background-color: white;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  padding-bottom:2%;
`;


const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const Title = styled.h2`
  margin-top: 5px;
  font-weight: bold;
  display:flex;
  align-items:center;
`;

const NewForm = styled.form`
  width: 75%;
`;


const TripView = props => {
  let singleTrip = props.singleTrip;

  useEffect(() => {
    let id = props.match.params.tripID;
    props.fetchTrip(id);
  }, [props.changed]);
  
  const redirect = (type) => {
    props.history.push(`/trips/${props.match.params.tripID}${type}`);
  };

  function handleMenuClick(e) {
    console.log("click", e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="2" onClick={() => redirect("/people/add")}>
        Add People
      </Menu.Item>
      {singleTrip && singleTrip.people.length > 0 && <Menu.Item key="3" onClick={() => redirect("/expense/add")}>
        Add Expense
      </Menu.Item>}
    </Menu>
  );

  return (
    <div className="trip-view-container">
      {singleTrip && <>
      <AlignDiv>
          <TripDiv>
            <NewForm>
                <div onClick={() => props.history.push("/trips")} className="back-arrow-container">
                  <p className="back-arrow"><Icon type="arrow-left" /> <span>View all trips</span></p>
                </div>
              <HeadingContainer>
                <Title>
                  {singleTrip.destination}
                </Title>
                <Dropdown overlay={menu} className="dropdown">
                  <Button size="small">
                    Actions <Icon type="down" />
                  </Button>
                </Dropdown>
              </HeadingContainer>

              <p>Date of Trip: {singleTrip.date.substring(0, 10)}</p>
              <p>Ongoing: {singleTrip.active ? "Yes" : "No"}</p>
              <div>
                <h2>Attendees:</h2>
                <ul className="name-list">
                {singleTrip.people.map(person => (
                  <li key={person.id}>
                    {person.first_name} {person.last_name}{" "}
                    <Icon
                      className="edit-icon"

                      type="edit"
                      onClick={() => redirect(`/people/${person.id}/edit`)}
                    />
                  </li>
                ))}
                </ul>
              </div>
            </NewForm>
          </TripDiv>

      </AlignDiv>
      <div className='expense-container'>
        <h2 className="expenses">Expenses</h2>
        {singleTrip.expenses.map(expense => (
          <div className="expense-card" key={expense.id}>
            <h2>{expense.name}: ${expense.amount} </h2>
            <p>
              paid by <span className="payer">{expense.person_name}</span>
              <Icon
                className="edit-icon"
                type="edit"
                onClick={() => redirect(`/expense/${expense.id}/edit`)}
              />
            </p>
            <h3>Tracked Fees</h3>
            <ul>
              {expense.debts.map(debt => (
                <li key={debt.person_id}>
                  {debt.person_name} owes {debt.amount} dollars
                  <Icon
                    className="edit-icon"
                    type="edit"
                    onClick={() =>
                      redirect(
                        `/expense/${expense.id}/debt/${debt.person_id}/edit`
                      )
                    }
                  />
                </li>
              ))}
            </ul>
            {singleTrip.expenses.length > 0 && (
              <Button
                className="main-buttons"
                type="primary"
                size="small"
                block
                onClick={() => redirect(`/expense/${expense.id}/debt/add`)}
              >
                Add Debt
              </Button>
            )}
          </div>

        ))}
      </div>
      {singleTrip && <TotalPrice singleTrip={singleTrip} />}
      </>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    singleTrip: state.singleTrip,
    username: state.username,
    changed: state.changed,
  }
};

export default connect(
  mapStateToProps,
  { fetchTrip: fetchTrip }
)(TripView);
