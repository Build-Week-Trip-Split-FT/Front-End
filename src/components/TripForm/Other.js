import React, { useState } from 'react';

const OtherForm = () => {
  // {
  //   name:
  //   username:
  //   password:
  //   email:
  // }
  let [initData, setData] = useState(
    {
      destination: "",
      date: new Date(),
      active: true,
      created_by: "",
      people: [
        {
          first_name: "",
          last_name: "",
        }
      ],
      expenses: [
        {
          name:"",
          amount:"",
          person_name:"",
        }
      ]
    }
  );

  const addPersonField = (event) => {
    event.preventDefault();
    setData({...initData, people: [...initData.people, {first_name: "", last_name: ""} ]})
  }

  const addExpenseField = (event) => {
    event.preventDefault();
    setData({...initData, expenses: [...initData.expenses, {name: "", amount: 0, person_name: ""} ]})
  }

  const handleArrChange = (event, field, idx) => {
    let newArray = [...initData[field]];
    newArray[idx][event.target.name] = event.target.value;
    setData({...initData, [field]: newArray});
  }
  const handleChange = (event) => {
    if (event.target.name === "active") {
      setData({...initData, active: !initData.active});
    } else {
      setData({...initData, [event.target.name]: event.target.value});
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(initData);
  }

  return (
    <div>
      I am a regular form!
      <form>
        <div onChange={(e) => handleChange(e)}>
          <label>Event Name: </label>
          <input type="text" placeholder="Destination" name="destination" value={initData.destination} />
        </div>
        <div onChange={(e) => handleChange(e)}>
          <label>Date: </label>
          <input type="date" name="date" value={initData.date} />
        </div>
        <div onChange={(e) => handleChange(e)}>
          <label>In Progress? </label>
          <input type="checkbox" name="active" checked={initData.active}/>
        </div>
        <div onChange={(e) => handleChange(e)}>
          <label>Created by: </label>
          <input type="text" placeholder="Organizer" name="created_by" value={initData.created_by}/>
        </div>
        <div>
          <label>People</label>
          {initData.people.map((person,idx) =>
            <div onChange={(e) => handleArrChange(e,"people", idx)}>
              <label>Name</label>
              <input type="text" placeholder="first_name" name="first_name" value={person.first_name}/>
              <input type="text" placeholder="last_name" name="last_name" value={person.last_name}/>
            </div>
          )}
          <button onClick={(e) => addPersonField(e)}> Add Another Person!</button>
        </div>
        <div>
          <label>Expenses</label>
          {initData.expenses.map((expense,idx) =>
            <div onChange={(e) => handleArrChange(e,"expenses", idx)}>
              <label> Name</label>
              <input type="text" name="name" value={expense.name}/>
              <label>Value</label>
              <input type="text" name="amount" value={expense.amount}/>
              <label>Who Paid For It</label>
              <input type="text" name="person_name" value={expense.person_name}/>
            </div>
          )}
          <button onClick={(e) => addExpenseField(e)}>Add expense</button>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Submit Trip</button>
      </form>
    </div>
  )
}

export default OtherForm;