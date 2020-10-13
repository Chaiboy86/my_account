import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { getExpense } from "../../../actions/expense";
import { withStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
} from "recharts";
import Title from "../atoms/Title";

// スタイルの定義は未定
// const useStyles = (theme) => ({});

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData("00:00", 0),
//   createData("03:00", 300),
//   createData("06:00", 600),
//   createData("09:00", 800),
//   createData("12:00", 1500),
//   createData("15:00", 2000),
//   createData("18:00", 2400),
//   createData("21:00", 2400),
//   createData("24:00", undefined),
// ];

export class Chart extends Component {
  state = {
    data: this.props.expense.map((expense) => ({
      category: expense.category.name,
      amount: expense.value,
    })),
  };
  // data = this.props.expense.map((expense) => ({
  //   category: expense.category.name,
  //   amount: expense.value,
  // }));
  // const theme = useTheme();

  static propTypes = {
    expense: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <Title>カテゴリーとアイテム別</Title>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Sales ($)
            </Label>
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.expense.expense,
});

export default connect(mapStateToProps, {
  getExpense,
})(Chart);
