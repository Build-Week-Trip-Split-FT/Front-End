import React from 'react';

const TotalPrice = ({ singleTrip }) => {
  calculateDifferences(singleTrip);
  return (
    <div>Testing</div>
  )
}

const calculateDifferences = (trip) => {
  let totalCost = trip.expenses.reduce((cost, expense) => Number(expense.amount) + cost, 0);
  let size = trip.people.length;
  let dividedCost = totalCost/size;
  let people = {};
  for (let i = 0; i < size; i++) {
    let id = trip.people[i].id;
    people[id] = {name: trip.people[i].first_name + " " + trip.people[i].last_name, cost: dividedCost}
  }
  for (let i = 0; i < trip.expenses.length; i++) {
    for (let j = 0; j < trip.expenses[i].debts.length; j++) {
      let currentExpense = Number(trip.expenses[i].amount)/size;
      let debt = trip.expenses[i].debts[j];
      people[debt.person_id].cost += (Number(debt.amount) - currentExpense);
    }
  }
  return people
}

export default TotalPrice;