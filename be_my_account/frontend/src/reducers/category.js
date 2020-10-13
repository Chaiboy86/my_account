import {
  GET_CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions/types.js";

const initialState = {
  category: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(
          (category) => category.id !== action.payload
        ),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    default:
      return state;
  }
}
