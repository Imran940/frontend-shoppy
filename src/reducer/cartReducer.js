let initialState = [];
if (localStorage.getItem("cart")) {
  initialState = JSON.parse(localStorage.getItem("cart"));
} else {
  initialState = [];
}
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "REMOVE_FROM_CART":
      return action.payload;
    default:
      return state;
  }
}
