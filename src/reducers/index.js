import { FETCHING, FETCH_SUCCESS, FETCH_FAILURE, LOGGING_IN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNING_UP, SIGNUP_FAILURE, SIGNUP_SUCCESS, TOGGLE_PAID } from '../actions';
import { mockData } from '../utils';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING:
      return {...state, isFetching: true, fetching_message: "I am fetching!"}
    case LOGGING_IN:
      console.log("LOGGING");
      return {...state, isFetching: true, fetching_message: "Logging in User..."}
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {...state, isFetching: false, fetching_message: "", error: false}
    case LOGIN_FAILURE:
      console.log(action.payload);
      return {...state, isFetching: false, fetching_message: "", error: true, error_message: action.payload}
    case SIGNING_UP:
      console.log("signing up");
      return {...state, isFetching: true, fetching_message:"SIGNING UP..."}
    case SIGNUP_SUCCESS:
      console.log("signed up");
      return {...state, isFetching: false, fetching_message: "SIGNED UP!", error: false}
    case SIGNUP_FAILURE: 
    console.log(action.payload);
    return {...state, isFetching: false, fetching_message: "", error: true, error_message:"U FAILED"}
    case TOGGLE_PAID: {
      return {...state, currentData: {...state.currentData, people: action.payload}}
    }
    default:
      return state;
  }
}

const initialState = {
  currentData: mockData,
  isFetching: false,
  fetching_message: "",
  error: false,
  error_message: "",
};