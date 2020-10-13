// React部品
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// 日本語文言
import * as text from "../../constants";

// カラーパレット
import { CHART_COLORS } from "../../constantsStyle";

// recharts部品
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "../layout/atoms/Title";

// actions部品
import { getExpenseUtilitySummary } from "../../actions/expense";

export class ExpenseLineChart extends Component {
  componentDidMount() {
    this.props.getExpenseUtilitySummary();
  }

  render() {
    return (
      <Fragment>
        <Title>{text.CATEGORY_ITEM}</Title>
        <ResponsiveContainer>
          <LineChart data={this.props.utilitySummary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="water" stroke={CHART_COLORS[5]} type="monotone" />
            <Line
              dataKey="electric"
              stroke={CHART_COLORS[13]}
              type="monotone"
            />
            <Line dataKey="gas" stroke={CHART_COLORS[0]} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  utilitySummary: state.expense.utilitySummary,
});

export default connect(mapStateToProps, { getExpenseUtilitySummary })(
  ExpenseLineChart
);
