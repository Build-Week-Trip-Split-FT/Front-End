import React from 'react';

import './TotalPrice.scss';

const TotalPrice = (props) => {
  let costs = calculateSplits(props.singleTrip);
  let total = props.singleTrip.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
  return (
    <div className="total-price-container">
      <h2>A Grand Total of ${total}</h2>
      {Object.keys(costs).map(key => 
        <div>
          <p key={key}>{costs[key].name} owes <span className="tp-debt">${costs[key].cost}</span></p>
        </div>
      )}
    </div>
  )
}

const calculateSplits = (trip) => {
  let people = {};
  for (let i = 0; i < trip.people.length; i++) {
    let id = trip.people[i].id;
    people[id] = {name: trip.people[i].first_name + " " + trip.people[i].last_name, cost: 0}
  }
  for (let i = 0; i < trip.expenses.length; i++) {
    let paidPeople = {}
    let currentExpense = Number(trip.expenses[i].amount)
    for (let j = 0; j < trip.expenses[i].debts.length; j++) {
      let debt = trip.expenses[i].debts[j];
      currentExpense -= Number(debt.amount);
      people[debt.person_id].cost += Number(debt.amount)
      paidPeople[debt.person_id] = true;
    }
    let dividedCost = Math.round(100*(currentExpense / (trip.people.length - Object.keys(paidPeople).length)))/100;
    for (let person in people) {
      if (!(person in paidPeople)) {
        people[person].cost += dividedCost
      }
    }
  }
  return people
}

export default TotalPrice;