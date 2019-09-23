import { axiosWithAuth } from '../utils';

export const FETCHING = "FETCHING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_ERROR";
export const SIGNING_UP = "SIGNIN_UP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const TOGGLE_PAID = "TOGGLE_PAID";

const baseURL = "";

export const fetchData = (partial) => dispatch => {
  dispatch({type: FETCHING})
}

export const logInUser = (user) => dispatch => {
  dispatch({type: LOGGING_IN})
  axiosWithAuth().post(`${baseURL}/login`, user)
    .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data.token}))
    .catch(err => dispatch({type: LOGIN_FAILURE, payload: err}));
}

export const signUpUser = (user) => dispatch => {
  dispatch({type: SIGNING_UP})
  axiosWithAuth().post(`${baseURL}/signup`, user)
    .then(res => dispatch({type: SIGNUP_SUCCESS}))
    .catch(err => dispatch({type: SIGNUP_FAILURE, payload: err}));
}

export const togglePaid = (person, trip) => {
  let people = trip;
  let newPeople = people.map(searchedPerson => {
    if (searchedPerson.name == person.name) {
      // Toggles clicked person's paid status
      return {...searchedPerson, paid: !person.paid}
    }
    return searchedPerson
  });
  return {type: TOGGLE_PAID, payload: newPeople}
}

// Saves when clicking on save or complete edit
export const updateDB = (trip) => dispatch => {
  dispatch({});
  axiosWithAuth.put(`${baseURL}/sdfdsfds`, trip)
    .then(res => dispatch({type: "", payload: trip}))
    .catch(err => dispatch({type: "", payload: err})) 
    asdjl;ajsdf;lkajeropiawrp[oiasdflkj;appendFileSync;laksdfa;sdlk]
}