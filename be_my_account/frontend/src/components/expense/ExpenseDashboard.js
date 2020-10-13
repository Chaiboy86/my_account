// React部品
import React, { Fragment } from "react";

// コンポーネント
import ExpenseLineChart from "./ExpenseLineChart";
import ExpenseItemPieChart from "./ExpenseItemPieChart";
import ExpenseCategoryPieChart from "./ExpenseCategoryPieChart";
import DefaultPage from "../layout/templates/DefaultPage";
import ExpenseForm from "./ExpenseForm";
import Expense from "./Expense";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseSummaryPersonal from "./ExpenseSummaryPersonal";
import ExpenseSummaryCommon from "./ExpenseSummaryCommon";

export default function ExpenseDashboard() {
  return (
    <Fragment>
      <DefaultPage rightSideContent={<ExpenseForm />}>
        {/* paperWidthでpaperの幅が決まる */}
        {/* paperHeightでpaperを指定の高さに設定する */}
        <ExpenseSummaryPersonal paperWidth={4} />
        <ExpenseSummaryCommon paperWidth={4} />
        <ExpenseSummary paperWidth={4} />
        {/* <ExpenseItemPieChart paperWidth={4} paperHeight={true} /> */}
        <ExpenseCategoryPieChart paperWidth={4} paperHeight={true} />
        <ExpenseLineChart paperWidth={12} paperHeight={true} />
        <Expense paperWidth={12} />
      </DefaultPage>
    </Fragment>
  );
}
