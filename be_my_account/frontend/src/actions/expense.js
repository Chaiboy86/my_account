import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  ADD_EXPENSE,
  GET_EXPENSE_SUMMARY,
  GET_EXPENSE_SUMMARY_PERSONAL,
  GET_EXPENSE_SUMMARY_COMMON,
  GET_EXPENSE_ITEM_SUMMARY,
  GET_EXPENSE_CATEGORY_SUMMARY,
  GET_EXPENSE_UTILITY_SUMMARY,
  GET_SELECTED_DATE,
} from "./types";
import { tokenConfig } from "./auth";

// GET EXPENSE
export const getExpense = (selectedDate) => (dispatch, getState) => {
  axios
    .get(`/api/expense/?date=${selectedDate}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE EXPENSE
export const deleteExpense = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/expense/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteExpense: "Item Deleted" }));
      dispatch({
        type: DELETE_EXPENSE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD EXPENSE
export const addExpense = (expense) => (dispatch, getState) => {
  axios
    .post("/api/expense/", expense, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addExpense: "Item Added" }));
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE EXPENSE
export const updateExpense = (expense) => (dispatch, getState) => {
  axios
    .put(`/api/expense/${id}`, expense, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateExpense: "Item Updated" }));
      dispatch({
        type: UPDATE_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE SUMMARY
export const getExpenseSummary = (selectedDate) => (dispatch, getState) => {
  axios
    .get(`/api/expensesummary/?date=${selectedDate}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_SUMMARY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE SUMMARY PERSONAL
export const getExpenseSummaryPersonal = (selectedDate) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/expense/summary/personal/?date=${selectedDate}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_SUMMARY_PERSONAL,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE SUMMARY COMMON
export const getExpenseSummaryCommon = (selectedDate) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/expense/summary/common/?date=${selectedDate}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_SUMMARY_COMMON,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE ITEM SUMMARY
export const getExpenseItemSummary = (selectedDate) => (dispatch, getState) => {
  axios
    .get(
      `/api/expense/item/summary/?date=${selectedDate}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_ITEM_SUMMARY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE CATEGORY SUMMARY
export const getExpenseCategorySummary = (selectedDate) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/expense/category/summary/?date=${selectedDate}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_CATEGORY_SUMMARY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET EXPENSE UTILITY SUMMARY
export const getExpenseUtilitySummary = () => (dispatch, getState) => {
  axios
    .get("/api/expense/utility/summary", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EXPENSE_UTILITY_SUMMARY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET SELECTED DATE
export const getSelectedDate = (year, month) => ({
  type: GET_SELECTED_DATE,
  payload: { year, month },
});
