import {
  GET_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
} from "../actions/types.js";

const initialState = {
  item: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        item: state.item.filter((item) => item.id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        item: [...state.item, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        item: [...state.item, action.payload],
      };
    default:
      return state;
  }
}
