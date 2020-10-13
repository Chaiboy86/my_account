import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_PAYMENTMETHOD,
  DELETE_PAYMENTMETHOD,
  UPDATE_PAYMENTMETHOD,
  ADD_PAYMENTMETHOD,
} from "./types";
import { tokenConfig } from "./auth";

// GET PAYMENTMETHOD
export const getPaymentMethod = () => (dispatch, getState) => {
  axios
    .get("/api/paymentmethod/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PAYMENTMETHOD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE PAYMENTMETHOD
export const deletePaymentMethod = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/paymentmethod/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deletePaymentMethod: "PaymentMethod Deleted" }));
      dispatch({
        type: DELETE_PAYMENTMETHOD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD PAYMENTMETHOD
export const addPaymentMethod = (paymentmethod) => (dispatch, getState) => {
  axios
    .post("/api/paymentmethod/", paymentmethod, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addPaymentMethod: "PaymentMethod Added" }));
      dispatch({
        type: ADD_PAYMENTMETHOD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE PAYMENTMETHOD
export const updatePaymentMethod = (paymentmethod) => (dispatch, getState) => {
  axios
    .put(`/api/paymentmethod/${id}`, paymentmethod, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updatePaymentMethod: "PaymentMethod Updated" }));
      dispatch({
        type: UPDATE_PAYMENTMETHOD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
