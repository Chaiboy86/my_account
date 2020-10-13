import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  ADD_EXPENSE,
} from "./types";
import { tokenConfig } from "./auth";

// GET EXPENSE
export const getExpense = () => (dispatch, getState) => {
  axios
    .get("/api/expense/", tokenConfig(getState))
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
