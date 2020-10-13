// React部品
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// 日本語文言
import * as text from "../../constants";

// カラーパレット
import { CHART_COLORS } from "../../constantsStyle";

// Material-ui部品(core)
import Typography from "@material-ui/core/Typography";

// actions部品
import { getExpenseItemSummary } from "../../actions/expense";

// recharts部品
import {
  PieChart,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import Title from "../layout/atoms/Title";

// utils部品
import { queryParamDateFormat } from "../../utils";

export class ExpenseItemPieChart extends Component {
  componentDidMount() {
    var initialDate = queryParamDateFormat(this.props.year, this.props.month);
    this.props.getExpenseItemSummary(initialDate);
  }

  componentDidUpdate(prevProps) {
    if (this.props.expense != prevProps.expense) {
      var updateDate = queryParamDateFormat(this.props.year, this.props.month);
      this.props.getExpenseItemSummary(updateDate);
    }
  }
  render() {
    return (
      <Fragment>
        <Title>{text.PIE_CHART_ITEM}</Title>
        <Typography color="textSecondary">
          {this.props.year + text.YEAR + this.props.month + text.MONTH}
        </Typography>
        <ResponsiveContainer>
          <PieChart width={730} height={250}>
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Pie
              data={this.props.itemSummary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            >
              {this.props.itemSummary.map((entry, index) => (
                <Cell
                  key={index}
                  //    TODO：項目ごとに色を固定で指定したい
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.expense.expense,
  itemSummary: state.expense.itemSummary,
  year: state.expense.year,
  month: state.expense.month,
});

export default connect(mapStateToProps, { getExpenseItemSummary })(
  ExpenseItemPieChart
);
