import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/molecules/Header";
import Dashboard from "./leads/Dashboard";
import ExpenseDashboard from "./expense/ExpenseDashboard";
import Alerts from "./layout/molecules/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

// Alert Option
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  // static propTypes = {
  //   isAuthenticated: PropTypes.bool,
  // };

  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={ExpenseDashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute
                  exact
                  path="/expense"
                  component={ExpenseDashboard}
                />
                <Dashboard />
                <ExpenseDashboard />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps)(App);

ReactDOM.render(<App />, document.getElementById("app"));
