export const FETCHING = "FETCHING"

export const fetchData = (partial) => dispatch => {
  dispatch({type: FETCHING})
}