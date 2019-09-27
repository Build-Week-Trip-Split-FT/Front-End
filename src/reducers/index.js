import { LOG_OUT, POSTING, UPDATING, AUTHORIZING, PUT_TRIP_SUCCESS, DELETE_TRIP_SUCCESS, FETCHING_TRIP, FETCH_TRIP_SUCCESS, POST_TRIP_SUCCESS, FETCH_USER_SUCCESS, POST_SUCCESS, FETCHING_USER, ERROR, LOGIN_SUCCESS, SIGNUP_SUCCESS, UPDATE_SUCCESS } from '../actions';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTHORIZING:
      return {...state, isFetching:true, fetching_message: action.payload}
    case SIGNUP_SUCCESS:
      return {...state, isFetching: false, fetching_message:"", error: false}
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      localStorage.setItem('username', action.user);
      localStorage.setItem('time', new Date().getTime());
      return {...state, isFetching: false, fetching_message: "", username:action.user, error: false, token:action.payload}
    case LOG_OUT:
      localStorage.clear();
      return {...initialState, token: ""}
    case FETCHING_TRIP:
      return {...state, isFetching: true, fetching_message: "Looking for trip...", error:false, singleTrip:"", changed:false}
    case FETCH_TRIP_SUCCESS:
      localStorage.setItem('trip', JSON.stringify(action.payload));
      return {...state, isFetching: false, fetching_message: "", error: false, singleTrip: action.payload, changed:false}
    case FETCHING_USER:
      return {...state, isFetching: true, fetching_message: "Looking for user...", singleTrip:""}
    case FETCH_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {...state, isFetching: false, fetching_message:"", userTrips: action.payload, error: false, changed:false}
    case POST_TRIP_SUCCESS:
        return {...state, isFetching: false, userTrips: action.payload, error: false, changed:false}
    case PUT_TRIP_SUCCESS:
      let newTrips = state.userTrips.trips.map(trip => {
        if (trip.id === action.payload.id) {
          return action.payload
        } else {
          return trip
        }
      })
      let newUserTrips = {...state.userTrips, isFetching: false, trips: newTrips};
      localStorage.setItem('user', JSON.stringify(newUserTrips));
      return {...state, userTrips: newUserTrips, error: false, changed:false}
    case DELETE_TRIP_SUCCESS:
      let filteredTrips = state.userTrips.trips.filter(trip => trip.id != action.payload);
      let filteredUserData = {...state.userTrips, trips: filteredTrips};
      return {...state, isFetching: false, error: false, userTrips: filteredUserData, changed:true}
    case POSTING:
      return {...state, isFetching: true, fetching_message: action.payload}
    case POST_SUCCESS:
      return {...state, isFetching: false, error: false, changed:true}
    case UPDATING:
      return {...state, isFetching: true, fetching_message: "Sending to database..."}
    case UPDATE_SUCCESS:
      return {...state, isFetching: false, error: false, changed:true}
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
  changed: false
};
