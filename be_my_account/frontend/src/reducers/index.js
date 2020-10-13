import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import expense from "./expense";
import category from "./category";
import item from "./item";
import paymentMethod from "./paymentMethod";

export default combineReducers({
  leads,
  errors,
  messages,
  auth,
  expense,
  category,
  item,
  paymentMethod,
});
