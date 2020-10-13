import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
} from "./types";
import { tokenConfig } from "./auth";

// GET CATEGORY
export const getCategory = () => (dispatch, getState) => {
  axios
    .get("/api/category/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE CATEGORY
export const deleteCategory = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/category/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteCategory: "Item Deleted" }));
      dispatch({
        type: DELETE_CATEGORY,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD CATEGORY
export const addCategory = (category) => (dispatch, getState) => {
  axios
    .post("/api/category/", category, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addCategory: "Item Added" }));
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE CATEGORY
export const updateCategory = (category) => (dispatch, getState) => {
  axios
    .put(`/api/category/${id}`, category, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateCategory: "Item Updated" }));
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
