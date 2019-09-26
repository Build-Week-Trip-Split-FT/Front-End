import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTrip } from "../../actions";
import { Button, Input, Tooltip, Icon, Dropdown, Menu } from "antd";
import TotalPrice from "../TotalPrice";
import "./TripView.scss";
import styled from "styled-components";

const TripDiv = styled.div`
  display: flex;
  flex-flow: column;
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

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-top: 25px;
  font-weight: bold;
`;

const NewForm = styled.form`
  width: 75%;
`;

const NameDetails = styled.div`
  text-align: center;
`;

const ExpenseDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
      {/* <Menu.Item
        key="1"
        onClick={() => redirect(`/expense/${expense.id}/debt/add`)}
      >
        Add Debt
      </Menu.Item> */}
      <Menu.Item key="2" onClick={() => redirect("/people/add")}>
        Add People
      </Menu.Item>
      <Menu.Item key="3" onClick={() => redirect("/expense/add")}>
        Add Expense
      </Menu.Item>
    </Menu>
  );

  return (
    <AlignDiv>
      {singleTrip && (
        <TripDiv>
          <NewForm>
            <HeadingContainer>
              <Title>{singleTrip.destination}</Title>
              <Dropdown overlay={menu} className="dropdown">
                <Button>
                  Actions <Icon type="down" />
                </Button>
              </Dropdown>
            </HeadingContainer>

            <p>Date of Trip: {singleTrip.date.substring(0, 10)}</p>
            <p>Active: {singleTrip.active ? "Yes" : "No"}</p>
            <NameDetails>
              <div>
                <h2>Attendees:</h2>
                {singleTrip.people.map(person => (
                  <div key={person.id}>
                    {person.first_name} {person.last_name}{" "}
                    <Icon
                      className="edit-icon"
                      type="edit"
                      onClick={() => redirect(`/people/${person.id}/edit`)}
                    />
                    {/* <Button
                    type="primary"
                    block
                    onClick={() => redirect(`/people/${person.id}/edit`)}
                  >
                    Edit person
                  </Button> */}
                  </div>
                ))}
              </div>
              <h2 className="expenses">Expenses:</h2>
            </NameDetails>

            {singleTrip.expenses.map(expense => (
              <ExpenseDiv key={expense.id}>
                {expense.name}: {expense.amount} paid by {expense.person_name}{" "}
                <Button
                  className="main-buttons"
                  type="primary"
                  block
                  onClick={() => redirect(`/expense/${expense.id}/edit`)}
                >
                  Edit expense
                </Button>
                <h2>How much owed</h2>
                <ul>
                  {expense.debts.map(debt => (
                    <li key={debt.person_id}>
                      {debt.person_name} owes {debt.amount} dollars
                      {/* <Button
                        className="main-buttons"
                        type="primary"
                        block
                        onClick={() =>
                          redirect(
                            `/expense/${expense.id}/debt/${debt.person_id}/edit`
                          )
                        }
                      >
                        Edit Debt
                      </Button> */}
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
                    block
                    onClick={() => redirect(`/expense/${expense.id}/debt/add`)}
                  >
                    Add Debt
                  </Button>
                )}
              </ExpenseDiv>
            ))}

            {/* <Button
              type="primary"
              block
              onClick={() => redirect("/people/add")}
            >
              Add Person
            </Button>
            {singleTrip.people.length > 0 && (
              <Button
                type="primary"
                block
                onClick={() => redirect("/expense/add")}
              >
                Add Expense
              </Button>
            )} */}
            {/* <TotalPrice singleTrip={singleTrip} /> */}
          </NewForm>
        </TripDiv>
      )}
    </AlignDiv>
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
