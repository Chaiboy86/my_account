// React部品
import React from "react";

// 日本語文言
import * as text from "../../../constants";

// Material-ui部品(core)
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

// Material-ui部品(icons)
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";

// スタイル定義
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// Header関数
export default function Header(props) {
  // スタイルの適用
  const classes = useStyles();
  // 関数内容のデータ
  const menuListItem = [
    { text: text.ACCOUNT, icon: <AccountCircleIcon /> },
    { text: text.NOTIFICATION, icon: <NotificationsIcon /> },
    { text: text.LOGOUT, icon: <ExitToAppIcon /> },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* ドロワー部分 */}
          {props.drawer}
          <Typography variant="h6" className={classes.title}>
            {text.APP_TITLE}
          </Typography>
          <div>
            {menuListItem.map((list, index) => (
              <Tooltip title={list.text} arrow key={index}>
                <IconButton color="inherit" style={{ outline: "none" }}>
                  {list.icon}
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
