// React部品
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// 日本語文言
import * as text from "../../../constants";

// Material-ui部品(core)
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Tooltip from "@material-ui/core/Tooltip";

// Material-ui部品(icons)
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaymentIcon from "@material-ui/icons/Payment";
import SendIcon from "@material-ui/icons/Send";

// スタイル定義
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

// Drawer関数
export default function Drawer() {
  // スタイルの適用
  const classes = useStyles();
  // Stateの宣言
  const [open, setOpen] = useState(false);
  // 関数内用のデータ
  const drawerListItem = [
    { text: text.DASHBOARD, url: "/expense", icon: <DashboardIcon /> },
    { text: text.EXPENSE, url: "/expense", icon: <PaymentIcon /> },
    { text: text.INCOME, url: "/expense", icon: <AccountBalanceWalletIcon /> },
    { text: text.SAVINGS, url: "/expense", icon: <AccountBalanceIcon /> },
    { text: text.CLAIM, url: "/expense", icon: <SendIcon /> },
    { text: text.BUDGET, url: "/expense", icon: <MonetizationOnIcon /> },
  ];
  // 関数内用の関数
  const handleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <Fragment>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        style={{ outline: "none" }}
        onClick={handleDrawer(true)}
      >
        <Tooltip title={text.MENU} arrow>
          <MenuIcon />
        </Tooltip>
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={handleDrawer(false)}
        onOpen={handleDrawer(true)}
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={handleDrawer(false)}
          onKeyDown={handleDrawer(false)}
        >
          <List>
            {drawerListItem.map((list, index) => (
              <ListItem button component={Link} to={list.url} key={index}>
                <ListItemIcon>
                  <Tooltip title={list.text} arrow placement="right">
                    {list.icon}
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={list.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
}
