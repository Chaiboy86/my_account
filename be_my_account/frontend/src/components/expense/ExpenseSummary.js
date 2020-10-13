// React部品
import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// 日本語文言
import * as text from "../../constants";

// Material-ui部品(core)
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// Material-ui部品(icons)

// コンポーネント
import Title from "../layout/atoms/Title";

import { displayIntegerFormat } from "../../utils";

// スタイルの適用
const useStyles = (theme) => ({
  depositContext: {
    flex: 1,
  },
});

export class ExpenseSummary extends Component {
  static propTypes = {};
  // JSX内で変数を利用する

  render() {
    return (
      <Fragment>
        {console.log(
          displayIntegerFormat(this.props.summary.sum_ammount_month)
        )}
        <Title>{text.SUM_VALUE}</Title>
        <Typography color="textSecondary">
          {this.props.year + text.YEAR + this.props.month + text.MONTH}
        </Typography>
        <Typography component="p" variant="h4">
          {text.YEN}
          {displayIntegerFormat(this.props.summary.sum_ammount_month)}
        </Typography>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  summary: state.expense.summary,
  year: state.expense.year,
  month: state.expense.month,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(ExpenseSummary);
