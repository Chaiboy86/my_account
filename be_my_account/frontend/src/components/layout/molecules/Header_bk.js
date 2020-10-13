import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import clsx from "clsx";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import Tooltip from "@material-ui/core/Tooltip";
import * as text from "../../../constants";
import HomeIcon from "@material-ui/icons/Home";
import PaymentIcon from "@material-ui/icons/Payment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
});

export class Header extends Component {
  state = {
    open: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { classes, theme } = this.props;
    const { open } = this.state;
    const authLinks = (
      <div>
        {/* TODO:名前が表示できるように修正 */}
        {/* <Typography>{user ? `Welcome ${user.username}` : ""}</Typography> */}
        <Tooltip title={text.ACCOUNT} arrow>
          <IconButton color="inherit" style={{ outline: "none" }}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={text.NOTIFICATION} arrow>
          <IconButton color="inherit" style={{ outline: "none" }}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title={text.LOGOUT} arrow>
          <IconButton
            onClick={this.props.logout}
            color="inherit"
            style={{ outline: "none" }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </div>
    );

    const authToolBar = (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
          style={{ outline: "none" }}
        >
          <Tooltip title={text.MENU} arrow>
            <MenuIcon />
          </Tooltip>
        </IconButton>
      </div>
    );
    const guestToolBar = (
      <div>
        <HomeIcon className={classes.homeIcon} />
      </div>
    );

    return (
      <Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              {isAuthenticated ? authToolBar : guestToolBar}
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {text.APP_TITLE}
              </Typography>
              {isAuthenticated ? authLinks : null}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton
                onClick={this.handleDrawerClose}
                style={{ outline: "none" }}
              >
                <Tooltip title={text.CLOSE} arrow>
                  <ChevronLeftIcon />
                </Tooltip>
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                to="/expense"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.DASHBOARD} arrow placement="right">
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.DASHBOARD} />
              </ListItem>
              <Divider />
              <ListItem
                button
                component={Link}
                to="/expense"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.EXPENSE} arrow placement="right">
                    <PaymentIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.EXPENSE} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/expense"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.INCOME} arrow placement="right">
                    <AccountBalanceWalletIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.INCOME} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/expense"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.SAVINGS} arrow placement="right">
                    <AccountBalanceIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.SAVINGS} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.CLAIM} arrow placement="right">
                    <SendIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.CLAIM} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/"
                onClick={this.handleDrawerClose}
              >
                <ListItemIcon>
                  <Tooltip title={text.BUDGET} arrow placement="right">
                    <MonetizationOnIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={text.BUDGET} />
              </ListItem>
            </List>
          </Drawer>
          {/* TODO: ReactChildrenの汎用性が高い書き方をする(For文) */}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    {this.props.children[0]}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {this.props.children[1]}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {this.props.children[2]}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(
  withStyles(useStyles),
  withTheme,
  connect(mapStateToProps, { logout })
)(Header);
