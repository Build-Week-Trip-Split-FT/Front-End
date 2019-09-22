import { FETCHING } from '../actions';
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING:
      return {isFetching: true, title: "I am fetching!"}
    default:
      return state;
  }
}

const initialState = {
  currentData: "",
  isFetching: false,
  title: "I am a title"
  
};