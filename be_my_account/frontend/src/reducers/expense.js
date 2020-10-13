import {
  GET_EXPENSE,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
} from "../actions/types.js";

const initialState = {
  expense: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE:
      return {
        ...state,
        expense: action.payload,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expense: state.expense.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expense: [...state.expense, action.payload],
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expense: [...state.expense, action.payload],
      };
    default:
      return state;
  }
}
