import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExpense, deleteExpense } from "../../actions/expense";
import * as text from "../../constants";
import * as sv from "../../systemValue";
import Title from "../layout/atoms/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export class Expense extends Component {
  static propTypes = {
    expense: PropTypes.array.isRequired,
    getExpense: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getExpense();
  }

  displayAccountName(expense) {
    if (expense.account_sv == sv.ACCOUNT_COMMON_SV) {
      return <TableCell>{text.ACCOUNT_COMMON}</TableCell>;
    } else if (expense.account_sv == sv.ACCOUNT_PERSONAL_SV) {
      return <TableCell>{text.ACCOUNT_PERSONAL}</TableCell>;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Title>{text.EXPENSE_LIST}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{text.CATEGORY}</TableCell>
              <TableCell>{text.ITEM}</TableCell>
              <TableCell>{text.ACCOUNT}</TableCell>
              <TableCell>{text.PAYMENT_METHOD}</TableCell>
              <TableCell>{text.VALUE}</TableCell>
              <TableCell>{text.DATE}</TableCell>
              <TableCell>{text.PLACE}</TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  {text.YEN}
                  {expense.value}
                </TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.place}</TableCell>
                <TableCell>
                  <Button
                    onClick={this.props.deleteExpense.bind(this, expense.id)}
                    variant="contained"
                    color="secondary"
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
});

export default connect(mapStateToProps, { getExpense, deleteExpense })(Expense);
