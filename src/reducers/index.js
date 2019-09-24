import { FETCHING, FETCH_SUCCESS, FETCH_FAILURE, ERROR, LOGGING_IN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNING_UP, SIGNUP_FAILURE, SIGNUP_SUCCESS, TOGGLE_PAID, SET_EVENT } from '../actions';
import { mockData } from '../utils';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING:
      return {...state, isFetching: true, fetching_message: "I am fetching!"}
    case LOGGING_IN:
      return {...state, isFetching: true, fetching_message: "Logging in User..."}
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {...state, isFetching: false, fetching_message: "", username:action.user, error: false}
    case LOGIN_FAILURE:
      return {...state, isFetching: false, fetching_message: "", error: true, error_message: "Failed to Login"}
    case SIGNING_UP:
      return {...state, isFetching: true, fetching_message:"SIGNING UP..."}
    case SIGNUP_SUCCESS:
      return {...state, isFetching: false, fetching_message: "SIGNED UP!", error: false}
    case SIGNUP_FAILURE: 
      return {...state, isFetching: false, fetching_message: "", error: true, error_message:"U FAILED"}
    case TOGGLE_PAID:
      return {...state, userTrips: {...state.userTrips, people: action.payload}}
    case SET_EVENT:
      return {...state, singleTrip: action.payload}
    case ERROR:
      return {...state, error: true, error_message: action.payload}
    default:
      return state;
  }
}

const initialState = {
  userTrips: mockData,
  singleTrip: mockData[0],
  isFetching: false,
  fetching_message: "",
  error: false,
  error_message: "",
  username: "",
};