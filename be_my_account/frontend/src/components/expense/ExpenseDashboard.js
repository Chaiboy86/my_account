import React, { Fragment } from "react";
import ExpenseForm from "./ExpenseForm";
import Expense from "./Expense";
import Header from "../layout/molecules/Header";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function ExpenseDashboard() {
  return (
    <Fragment>
      {/* TODO: ReactChildrenの汎用性が高い書き方をする */}
      <Header>
        <ExpenseForm />
        <Expense />
        {/* <Header child1={<ExpenseForm />}><Expense /> */}
      </Header>
    </Fragment>
  );
}
