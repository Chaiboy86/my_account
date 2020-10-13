import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_ITEM, DELETE_ITEM, UPDATE_ITEM, ADD_ITEM } from "./types";
import { tokenConfig } from "./auth";

// GET ITEM
export const getItem = () => (dispatch, getState) => {
  axios
    .get("/api/item/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE ITEM
export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/item/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteItem: "Item Deleted" }));
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD ITEM
export const addItem = (item) => (dispatch, getState) => {
  axios
    .post("/api/item/", item, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addItem: "Item Added" }));
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE ITEM
export const updateItem = (item) => (dispatch, getState) => {
  axios
    .put(`/api/item/${id}`, item, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateItem: "Item Updated" }));
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
