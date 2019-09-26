import { axiosWithAuth } from '../utils';

export const AUTHORIZING = "AUTHORIZING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOG_OUT = "LOG_OUT";

export const FETCHING_USER = "ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const POST_TRIP_SUCCESS = "POST_TRIP_SUCCESS";
export const PUT_TRIP_SUCCESS = "PUT_TRIP_SUCCESS";
export const DELETE_TRIP_SUCCESS = "DELETE_TRIP_SUCCESS";

export const FETCHING_TRIP = "FETCHING";
export const FETCH_TRIP_SUCCESS = "FETCH_TRIP_SUCCESS";
export const POSTING = "POSTING";
export const POST_SUCCESS = "POST_SUCCESS"
export const UPDATING = "UPDATING";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

export const ERROR = "ERROR";

const baseURL = "https://bd-trip-split.herokuapp.com/api";

export const checkTime = () => {
  let currentTime = new Date().getTime();
  let oldTime = Number(localStorage.getItem('time'));
  if (!oldTime || currentTime - oldTime > 1.08e+7) {
    return logOut();
  }
  return ({type:"default"});
}

export const logOut = () => {
  return {type:LOG_OUT}
}

export const logInUser = (user) => dispatch => {
  let URL = baseURL+"/auth/login";
  dispatch({type: AUTHORIZING, payload: "Logging In..."})
  axiosWithAuth().post(URL, user)
    .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data.token, user: user.username}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const signUpUser = (user) => dispatch => {
  let URL = baseURL + "/auth/register";
  dispatch({type: AUTHORIZING, payload: "Signing up..."})
  axiosWithAuth().post(URL, user)
    .then(res => dispatch({type: SIGNUP_SUCCESS}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}


export const fetchUser = (username) => dispatch => {
  let URL = baseURL + `/users/${username}`;
  dispatch({type: FETCHING_USER});
  axiosWithAuth().get(URL)
    .then(res => dispatch({type: FETCH_USER_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const updateTrip = (partial, trip) => dispatch => {
  let newTrip = {destination: trip.destination, date: trip.date, active: trip.active}
  axiosWithAuth().put(`${baseURL}${partial}`, newTrip)
    .then(res => dispatch({type: PUT_TRIP_SUCCESS, payload: trip}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const addTrip = (trip) => dispatch => {
  let URL = baseURL + `/users/${trip.username}/trips`;
  dispatch({type: FETCHING_TRIP});
  axiosWithAuth().post(URL, trip)
    .then(res => dispatch({type: POST_TRIP_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const deleteTrip = (partial, id) => dispatch => {
  axiosWithAuth().delete(baseURL+partial)
  .then(res => dispatch({type: DELETE_TRIP_SUCCESS, payload: id}))
  .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const fetchTrip = (id) => dispatch => {
  let URL = baseURL + `/trips/${id}`;
  dispatch({type: FETCHING_TRIP})
  axiosWithAuth().get(URL)
    .then(res => dispatch({type: FETCH_TRIP_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const postData = (partial, data) => dispatch => {
  let URL = baseURL + partial;
  dispatch({type: POSTING, payload: "Uploading submission..."})
  axiosWithAuth().post(URL, data)
    .then(res => dispatch({type:POST_SUCCESS}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

// Saves when clicking on save or complete edit
export const updateDB = (partial, info) => dispatch => {
  dispatch({type: UPDATING})
  axiosWithAuth().put(`${baseURL}${partial}`, info)
    .then(res => dispatch({type: UPDATE_SUCCESS, payload: info}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}

export const deleteInfo = (partial) => dispatch => {
  dispatch({type: UPDATING})
  axiosWithAuth().delete(baseURL+partial)
    .then(res => dispatch({type: UPDATE_SUCCESS}))
    .catch(err => dispatch({type: ERROR, payload: err.response.data.code}));
}