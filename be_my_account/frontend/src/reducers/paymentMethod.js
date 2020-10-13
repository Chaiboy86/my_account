import {
  GET_PAYMENTMETHOD,
  DELETE_PAYMENTMETHOD,
  ADD_PAYMENTMETHOD,
  UPDATE_PAYMENTMETHOD,
} from "../actions/types.js";

const initialState = {
  paymentmethod: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTMETHOD:
      return {
        ...state,
        paymentmethod: action.payload,
      };
    case DELETE_PAYMENTMETHOD:
      return {
        ...state,
        paymentmethod: state.paymentmethod.filter(
          (paymentmethod) => paymentmethod.id !== action.payload
        ),
      };
    case ADD_PAYMENTMETHOD:
      return {
        ...state,
        paymentmethod: [...state.paymentmethod, action.payload],
      };
    case UPDATE_PAYMENTMETHOD:
      return {
        ...state,
        paymentmethod: [...state.paymentmethod, action.payload],
      };
    default:
      return state;
  }
}
