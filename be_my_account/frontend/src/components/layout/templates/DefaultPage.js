// React部品
import React, { Component, Fragment } from "react";
import { compose } from "redux";

// Material-ui部品(core)
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles, withTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Material-ui部品(icons)

// コンポーネント
import Header from "../organisms/Header";
import Drawer from "../organisms/Drawer";
import StickyRightSideContent from "../organisms/StickyRightSideContent";

import ExpenseForm from "../../expense/ExpenseForm";

// その他ライブラリ
import clsx from "clsx";

// スタイルの適用
const useStyles = (theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: "flex",
    flexGrow: 1,
    overflow: "visible",
    marginTop: theme.spacing(10),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: "visible",
    display: "grid",
    gridTemplateAreas: "'mainContent' 'rightSideContent'",
    gridTemplateColumns: "3fr 1fr",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "visible",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
});

export class DefaultPage extends Component {
  render() {
    // JSX内で変数を利用する
    const { classes } = this.props;

    return (
      <Fragment>
        <Header drawer={<Drawer />} />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <div className="mainContent">
              <Grid container spacing={3}>
                {/* <Grid item xs={12}>
                  <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Chart />
                  </Paper>
                </Grid> */}
                {this.props.children.map((list, index) => (
                  // list.props.paperWidthは親から引き継いだ幅の値
                  // TODO:親コンポーネントから渡された値によって高さが変動できるようになって欲しい
                  <Grid item xs={list.props.paperWidth} key={index}>
                    <Paper
                      className={
                        list.props.paperHeight
                          ? clsx(classes.paper, classes.fixedHeight)
                          : classes.paper
                      }
                    >
                      {list}
                      {console.log(this.props.children)}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="rightSideContent">
              <StickyRightSideContent content={this.props.rightSideContent} />
            </div>
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default compose(withStyles(useStyles), withTheme)(DefaultPage);
