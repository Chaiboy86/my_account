import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getExpense,
  deleteExpense,
  getExpenseSummary,
  getExpenseSummaryCommon,
  getExpenseSummaryPersonal,
  getSelectedDate,
} from "../../actions/expense";
import * as text from "../../constants";
import * as sv from "../../systemValue";
import Title from "../layout/atoms/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {
  displayDateFormat,
  queryParamDateFormat,
  displayIntegerFormat,
} from "../../utils";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import lodash from "lodash";

const headerItemsbk = [
  { id: text.CATEGORY, label: text.CATEGORY },
  { id: text.ITEM, label: text.ITEM },
  { id: text.ACCOUNT, label: text.ACCOUNT },
  { id: text.PAYMENT_METHOD, label: text.PAYMENT_METHOD },
  { id: text.VALUE, label: text.VALUE },
  { id: text.DATE, label: text.DATE },
  { id: text.PLACE, label: text.PLACE },
];

const headerItemList = [
  text.CATEGORY,
  text.ITEM,
  text.ACCOUNT,
  text.PAYMENT_METHOD,
  text.VALUE,
  text.DATE,
  text.PLACE,
];

export class Expense extends Component {
  state = {
    sortItem: "",
    sortOrder: "desc",
    sortExpense: "",
  };

  static propTypes = {
    expense: PropTypes.array.isRequired,
    //yearとmonthも追加したいが、monthの場合はデータ型が変わってしまうため、別の方法で対応が必要
    // summary: PropType.Object.isRequired,
    getExpense: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func.isRequired,
    getExpenseSummary: PropTypes.func.isRequired,
    getExpenseSummaryPersonal: PropTypes.func.isRequired,
    getExpenseSummaryCommon: PropTypes.func.isRequired,
    getSelectedDate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    var initialDate = queryParamDateFormat(this.props.year, this.props.month);
    this.props.getExpense(initialDate);
    this.props.getExpenseSummary(initialDate);
    this.props.getExpenseSummaryCommon(initialDate);
    this.props.getExpenseSummaryPersonal(initialDate);
  }

  componentDidUpdate(prevProps) {
    if (this.props.expense != prevProps.expense) {
      var updateDate = queryParamDateFormat(this.props.year, this.props.month);
      this.props.getExpenseSummary(updateDate);
      this.props.getExpenseSummaryCommon(updateDate);
      this.props.getExpenseSummaryPersonal(updateDate);
    }
  }

  displayAccountName(expense) {
    if (expense.account_sv == sv.ACCOUNT_COMMON_SV) {
      return <TableCell>{text.ACCOUNT_COMMON}</TableCell>;
    } else if (expense.account_sv == sv.ACCOUNT_PERSONAL_SV) {
      return <TableCell>{text.ACCOUNT_PERSONAL}</TableCell>;
    }
  }

  handlePreviousMonth = () => {
    const { year, month } = this.props;
    var previousMonth = month;
    var previousYear = year;

    if (previousMonth == 1) {
      previousMonth = 12;
      previousYear--;
    } else {
      previousMonth--;
    }
    if (previousMonth < 10) {
      previousMonth = "0" + previousMonth;
    }
    const previousYearMonth = queryParamDateFormat(previousYear, previousMonth);

    this.props.getExpense(previousYearMonth);
    this.props.getExpenseSummary(previousYearMonth);
    this.props.getExpenseSummaryCommon(previousYearMonth);
    this.props.getExpenseSummaryPersonal(previousYearMonth);
    this.props.getSelectedDate(previousYear, previousMonth);
  };

  handleNextMonth = () => {
    const { year, month } = this.props;
    var nextMonth = month;
    var nextYear = year;

    if (nextMonth == 12) {
      nextMonth = 1;
      nextYear++;
    } else {
      nextMonth++;
    }
    if (nextMonth < 10) {
      nextMonth = "0" + nextMonth;
    }
    const nextYearMonth = queryParamDateFormat(nextYear, nextMonth);

    this.props.getExpense(nextYearMonth);
    this.props.getExpenseSummary(nextYearMonth);
    this.props.getExpenseSummaryCommon(nextYearMonth);
    this.props.getExpenseSummaryPersonal(nextYearMonth);
    this.props.getSelectedDate(nextYear, nextMonth);
  };

  // TODO: テーブルのそーと
  handleSortColumn = (headerItem) => {
    const isDesc =
      headerItem === this.state.sortItem && this.state.sortOrder === "desc";
    const nextOrder = isDesc ? "asc" : "desc";

    this.setState({
      sortItem: headerItem,
      sortOrder: nextOrder,
      // sortExpense: sortedExpense,
    });
  };

  render() {
    const { sortItem, sortOrder } = this.state;
    return (
      <Fragment>
        <Title>{text.EXPENSE_LIST}</Title>
        <div display="inline-block">
          <IconButton
            color="default"
            variant="default"
            onClick={this.handlePreviousMonth}
            style={{ outline: "none" }}
          >
            <Tooltip title={text.PREVIOUSMONTH} arrow>
              <ChevronLeftIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="default"
            variant="default"
            style={{ outline: "none" }}
            onClick={this.handleNextMonth}
          >
            <Tooltip title={text.NEXTMONTH} arrow>
              <ChevronRightIcon />
            </Tooltip>
          </IconButton>
          <Typography
            variant="h6"
            display="inline"
            style={{ verticalAlign: "middle" }}
          >
            {this.props.year + text.YEAR + this.props.month + text.MONTH}
          </Typography>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* TODO：テーブルのソート */}
              {headerItemList.map((headerItem) => (
                <TableCell
                  key={headerItem}
                  sortDirection={headerItem === sortItem ? sortOrder : false}
                >
                  <TableSortLabel
                    active={headerItem === sortItem}
                    direction={sortOrder}
                    onClick={this.handleSortColumn.bind(this, headerItem)}
                  >
                    {headerItem}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.expense.map((expense) => (
              // TODO: keyに何を渡すかを確認
              <TableRow key={expense.id}>
                <TableCell>{expense.category.name}</TableCell>
                <TableCell>{expense.item.name}</TableCell>
                {this.displayAccountName(expense)}
                <TableCell>{expense.paymentmethod.name}</TableCell>
                <TableCell align="right">
                  {text.YEN}
                  {displayIntegerFormat(expense.value)}
                </TableCell>
                <TableCell>{displayDateFormat(expense.date)}</TableCell>
                <TableCell>{expense.place}</TableCell>
                <TableCell>
                  <Button
                    onClick={this.props.deleteExpense.bind(this, expense.id)}
                    variant="outlined"
                    color="secondary"
                    disableElevation
                  >
                    {text.DELETE}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.expense.expense,
  summary: state.expense.summary,
  summaryCommon: state.expense.summaryCommon,
  summaryPersonal: state.expense.summaryPersonal,
  year: state.expense.year,
  month: state.expense.month,
});

export default connect(mapStateToProps, {
  getExpense,
  deleteExpense,
  getExpenseSummary,
  getExpenseSummaryCommon,
  getExpenseSummaryPersonal,
  getSelectedDate,
})(Expense);
