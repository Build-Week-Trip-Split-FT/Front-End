import { LOG_OUT, FETCHING_TRIP, FETCH_TRIP_SUCCESS, FETCH_USER_SUCCESS, FETCHING_USER, FETCH_TRIP_FAILURE, ERROR, LOGGING_IN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNING_UP, SIGNUP_FAILURE, SIGNUP_SUCCESS, SET_EVENT } from '../actions';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGNING_UP:
      return {...state, isFetching: true, fetching_message:"SIGNING UP..."}
    case SIGNUP_SUCCESS:
      return {...state, isFetching: false, fetching_message: "SIGNED UP!", error: false}
    case SIGNUP_FAILURE: 
      return {...state, isFetching: false, fetching_message: "", error: true, error_message:"U FAILED"}
    case LOGGING_IN:
      return {...state, isFetching: true, fetching_message: "Logging in User..."}
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      localStorage.setItem('username', action.user);
      localStorage.setItem('time', new Date().getTime());
      return {...state, isFetching: false, fetching_message: "", username:action.user, error: false, token:action.payload}
    case LOGIN_FAILURE:
      return {...state, isFetching: false, fetching_message: "", error: true, error_message: "Failed to Login"}
    case LOG_OUT:
      localStorage.clear();
      return {...initialState, token: ""}
    case FETCHING_TRIP:
      return {...state, isFetching: true, fetching_message: "I am fetching!", error:false, singleTrip:""}
    case FETCH_TRIP_SUCCESS:
      localStorage.setItem('trip', JSON.stringify(action.payload));
      return {...state, isFetching: false, fetching_message: "", error: false, singleTrip: action.payload}
    case FETCH_TRIP_FAILURE:
      return {...state, isFetching:false, error: true, error_message: action.payload}
    case FETCHING_USER:
      return {...state, isFetching: true, fetching_message: "Getting user info"}
    case FETCH_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {...state, isFetching: false, fetching_message:"", userTrips: action.payload}
    case "POST_SUCCESS":
      if (action.payload) {
        return {...state, userTrips: action.payload}
      } 
      return state;
    case SET_EVENT:
      return {...state, singleTrip: action.payload}
    case ERROR:
      return {...state, error: true, error_message: action.payload}
    default:
      return state;
  }
}

const initialState = {
  userTrips: JSON.parse(localStorage.getItem('user')),
  singleTrip: JSON.parse(localStorage.getItem('trip')),
  isFetching: false,
  fetching_message: "",
  error: false,
  error_message: "",
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
};
