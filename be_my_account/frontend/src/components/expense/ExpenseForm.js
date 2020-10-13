import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExpense } from "../../actions/expense";
import { getCategory } from "../../actions/category";
import { getItem } from "../../actions/item";
import { getPaymentMethod } from "../../actions/paymentMethod";
//デザイン関連
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { isPast } from "date-fns";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as text from "../../constants";
import * as sv from "../../systemValue";
import Title from "../layout/atoms/Title";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
});

// 日付の初期化
// TODO：カレンダーフォーマット処理を共通化する
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const initialDate = year + "-" + month + "-" + day;

// TODO:効率化する
const account = [
  {
    id: sv.ACCOUNT_COMMON_SV,
    name: text.ACCOUNT_COMMON,
  },
  {
    id: sv.ACCOUNT_PERSONAL_SV,
    name: text.ACCOUNT_PERSONAL,
  },
];

export class ExpenseForm extends Component {
  state = {
    category_id: "",
    item_id: "",
    value: "",
    // TODO:一度外で定数として定義してから呼ぶようにしたい。
    date: initialDate,
    account_sv: "",
    paymentmethod_id: "",
    place: "",
    note: "",
  };

  static propTypes = {
    addExpense: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired,
    getCategory: PropTypes.func.isRequired,
    getItem: PropTypes.func.isRequired,
    getPaymentMethod: PropTypes.func.isRequired,
  };

  // componentDidMount() {
  //   this.setState({ date: new Date("2014-08-18T21:11:54") });
  //   // this.setState({ date: "2014-08-18" });
  // }

  // カレンダーで選択した日付をstateに設定/保存する
  // TODO：カレンダーフォーマット処理を共通化する

  componentDidMount() {
    this.props.getCategory();
    this.props.getItem();
    this.props.getPaymentMethod();
  }

  handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatDate = year + "-" + month + "-" + day;
    this.setState({ date: formatDate });
  };

  // 選択したカテゴリーをstateに設定/保存する
  handleCategoryChange = (e) => {
    this.setState({ category_id: e.target.value });
  };

  // 選択したアイテムをstateに設定/保存する
  handleItemChange = (e) => {
    this.setState({ item_id: e.target.value });
  };

  // 選択した支払方法をstateに設定/保存する
  handlePaymentMethodChange = (e) => {
    this.setState({ paymentmethod_id: e.target.value });
  };

  // 選択したアカウントをstateに設定/保存する
  handleAccountChange = (e) => {
    this.setState({ account_sv: e.target.value });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      category_id,
      item_id,
      value,
      date,
      account_sv,
      paymentmethod_id,
      place,
      note,
    } = this.state;
    const expense = {
      category_id,
      item_id,
      value,
      date,
      account_sv,
      paymentmethod_id,
      place,
      note,
    };
    this.props.addExpense(expense);
    this.setState({
      category_id: "",
      item_id: "",
      value: "",
      date: initialDate,
      account_sv: "",
      paymentmethod_id: "",
      place: "",
      note: "",
    });
  };

  render() {
    const {
      category_id,
      item_id,
      value,
      date,
      account_sv,
      paymentmethod_id,
      place,
      note,
    } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Title>{text.EXPENSE_REGISTER}</Title>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormControl variant="outlined" fullWidth={true} margin="normal">
                <InputLabel>{text.CATEGORY}</InputLabel>
                <Select
                  value={category_id}
                  onChange={this.handleCategoryChange}
                  label="Category"
                >
                  {this.props.category.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined" fullWidth={true} margin="normal">
                <InputLabel>{text.ITEM}</InputLabel>
                <Select
                  value={item_id}
                  onChange={this.handleItemChange}
                  label="Item"
                >
                  {this.props.item
                    .filter((item) => item.category == category_id)
                    .map((filteredItem) => (
                      <MenuItem key={filteredItem.id} value={filteredItem.id}>
                        {filteredItem.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined" fullWidth={true} margin="normal">
                <InputLabel>{text.ACCOUNT}</InputLabel>
                <Select
                  value={account_sv}
                  onChange={this.handleAccountChange}
                  label="Account"
                >
                  {account.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined" fullWidth={true} margin="normal">
                <InputLabel>{text.PAYMENT_METHOD}</InputLabel>
                <Select
                  value={paymentmethod_id}
                  onChange={this.handlePaymentMethodChange}
                  label="PaymentMethod"
                >
                  {this.props.paymentmethod.map((paymentmethod) => (
                    <MenuItem key={paymentmethod.id} value={paymentmethod.id}>
                      {paymentmethod.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="value"
                label={text.VALUE}
                name="value"
                autoComplete="off"
                onChange={this.onChange}
                value={value}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{text.YEN}</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  inputVariant="outlined"
                  format="yyyy/MM/dd"
                  margin="normal"
                  InputAdornmentProps={{ position: "start" }}
                  id="date-picker-inline"
                  label={text.DATE}
                  value={date}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="place"
                label={text.PLACE}
                name="place"
                autoComplete="on"
                onChange={this.onChange}
                value={place}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="note"
                label={text.NOTE}
                name="note"
                autoComplete="on"
                onChange={this.onChange}
                value={note}
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {text.REGISTER}
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
  item: state.item.item,
  paymentmethod: state.paymentMethod.paymentmethod,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, {
    getCategory,
    getItem,
    getPaymentMethod,
    addExpense,
  })
)(ExpenseForm);
