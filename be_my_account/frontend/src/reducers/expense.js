import {
  GET_EXPENSE,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  GET_EXPENSE_SUMMARY,
  GET_EXPENSE_SUMMARY_PERSONAL,
  GET_EXPENSE_SUMMARY_COMMON,
  GET_EXPENSE_ITEM_SUMMARY,
  GET_EXPENSE_CATEGORY_SUMMARY,
  GET_EXPENSE_UTILITY_SUMMARY,
  GET_SELECTED_DATE,
} from "../actions/types.js";
import { displayCurrentYear, displayCurrentMonth } from "../utils";

const initialState = {
  expense: [],
  summary: {},
  summaryPersonal: {},
  summaryCommon: {},
  itemSummary: [],
  categorySummary: [],
  utilitySummary: [],
  year: displayCurrentYear(),
  month: displayCurrentMonth(),
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
    case GET_EXPENSE_SUMMARY:
      return {
        ...state,
        summary: action.payload.summary,
      };
    case GET_EXPENSE_SUMMARY_PERSONAL:
      return {
        ...state,
        summaryPersonal: action.payload.summaryPersonal,
      };
    case GET_EXPENSE_SUMMARY_COMMON:
      return {
        ...state,
        summaryCommon: action.payload.summaryCommon,
      };
    case GET_EXPENSE_ITEM_SUMMARY:
      return {
        ...state,
        itemSummary: action.payload,
      };
    case GET_EXPENSE_CATEGORY_SUMMARY:
      return {
        ...state,
        categorySummary: action.payload,
      };
    case GET_EXPENSE_UTILITY_SUMMARY:
      return {
        ...state,
        utilitySummary: action.payload,
      };
    case GET_SELECTED_DATE:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
      };
    default:
      return state;
  }
}
