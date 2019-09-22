import { FETCHING, FETCH_SUCCESS, FETCH_FAILURE, LOGGING_IN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNING_UP, SIGNUP_FAILURE, SIGNUP_SUCCESS, TOGGLE_PAID } from '../actions';
import { mockData } from '../utils';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING:
      return {isFetching: true, title: "I am fetching!"}
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
};