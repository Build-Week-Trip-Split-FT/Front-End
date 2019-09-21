export const reducer = (state=initialState, action) => {
  switch(action.type) {
    case "FETCHING":
      return {title: "I am fetching!"}
    default:
      return state;
  }
}

const initialState = {
  title: "I am a title"
};