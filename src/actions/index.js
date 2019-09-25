import { axiosWithAuth } from '../utils';

export const FETCHING_TRIP = "FETCHING";
export const FETCH_TRIP_SUCCESS = "FETCH_TRIP_SUCCESS";
export const FETCH_TRIP_FAILURE = "FETCH_TRIP_FAILURE";
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_ERROR";
export const SIGNING_UP = "SIGNIN_UP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const TOGGLE_PAID = "TOGGLE_PAID";
export const SET_EVENT = "SET_EVENT";
export const ERROR = "ERROR";
export const FETCHING_USER = "ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const LOG_OUT = "LOG_OUT";

const baseURL = "https://bd-trip-split.herokuapp.com/api";

export const checkTime = () => {
  let currentTime = new Date().getTime();
  let oldTime = Number(localStorage.getItem('time'));
  if (!oldTime || currentTime - oldTime > 1.08e+7) {
    logOut();
  }
  return ({type:"default"});
}

export const logOut = () => {
  return {type:LOG_OUT}
}
export const fetchUser = (username) => dispatch => {
  let URL = baseURL + `/users/${username}`;
  dispatch({type: FETCHING_USER});
  axiosWithAuth().get(URL)
    .then(res => dispatch({type: FETCH_USER_SUCCESS, payload: res.data}));
}

export const fetchTrip = (id) => dispatch => {
  let URL = baseURL + `/trips/${id}`;
  dispatch({type: FETCHING_TRIP})
  axiosWithAuth().get(URL)
    .then(res => dispatch({type: FETCH_TRIP_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: FETCH_TRIP_FAILURE, payload: err.response.data.code}));
}

export const postData = (partial, data) => dispatch => {
  let URL = baseURL + partial;
  dispatch({type: FETCHING_TRIP})
  axiosWithAuth().post(URL, data)
    .then(res => dispatch({type:"POST_SUCCESS"}));
}

export const logInUser = (user) => dispatch => {
  let URL = baseURL+"/auth/login";
  dispatch({type: LOGGING_IN})
  axiosWithAuth().post(URL, user)
    .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data.token, user: user.username}))
    .catch(err => dispatch({type: LOGIN_FAILURE, payload: err}));
}

export const signUpUser = (user) => dispatch => {
  let URL = baseURL + "/auth/register";
  dispatch({type: SIGNING_UP})
  axiosWithAuth().post(URL, user)
    .then(res => dispatch({type: SIGNUP_SUCCESS}))
    .catch(err => dispatch({type: SIGNUP_FAILURE, payload: err}));
}

export const setEvent = (event) => {
  return {type: SET_EVENT, payload:event}
}

export const togglePaid = (person, expense, trip) => {
  let newExpenses = trip.expenses.map(oldExpense => {
    if (oldExpense.name === expense.name) {
      return {...oldExpense, debts: oldExpense.debts.map(oldPerson => {
        if (oldPerson.person_name === person.person_name) {
          if (person.amount === 0) {
            oldPerson.amount = expense.amount / expense.debts.length
          } else {
            oldPerson.amount = 0
          }
        }
        return oldPerson
      })
    }}
    return oldExpense
  })
  let newTrip = {...trip, expenses: newExpenses}
  return {type: SET_EVENT, payload: newTrip};
}

// Saves when clicking on save or complete edit
export const updateDB = (partial, trip) => dispatch => {
  dispatch({type:"WOO"});
  axiosWithAuth().put(`${baseURL}${partial}`, trip)
    .then(res => dispatch({type: "WOO", payload: trip}))
    .catch(err => console.log(err.response)) 
}

export const addTrip = (trip) => dispatch => {
  let URL = baseURL + `/users/${trip.username}/trips`;
  dispatch({type: FETCHING_TRIP});
  axiosWithAuth().post(URL, trip)
    .then(res => dispatch({type: "POST_SUCCESS", payload: res.data}))
}

export const checkLogin = () => {
  if (!localStorage.getItem('token')) {
    return {type: ERROR, payload: "You must be logged in to view this page!"}
  }
}