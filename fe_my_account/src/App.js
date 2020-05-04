import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import * as route from "./route";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path={route.LOGIN} component={Login} />
      </Switch>
    );
  }
}

export default App;
