import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";
import Header from "../layout/molecules/Header";

export default function Dashboard() {
  return (
    <Fragment>
      <Header />
      <Form />
      <Leads />
    </Fragment>
  );
}
