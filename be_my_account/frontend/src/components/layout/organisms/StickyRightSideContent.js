// React部品
import React from "react";

// Material-ui部品(core)
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// スタイル定義
const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "visible",
    flexDirection: "column",
  },
}));

// Header関数
export default function StickyRightSideContent(props) {
  // スタイルの適用
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={10}>
          {props.content}
        </Paper>
      </Grid>
    </Grid>
  );
}
