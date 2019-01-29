import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    if (this.props.Authorization.authBool === true) {
      this.list = (
        <ClickAwayListener onClickAway={this.handleClose}>
          <MenuList role="menu">
            <MenuItem
              onClick={() => {
                this.props.SignOut(this.props.Authorization.authBASE);
                this.props.history.push(`/SignIn`);
              }}
              className={classes.dropdownItem}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      );
    } else {
      this.list = (
        <div>
          <ClickAwayListener onClickAway={this.handleClose}>
            <MenuList role="menu">
              <MenuItem
                onClick={() => {
                  this.props.history.push(`/SignIn`);
                }}
                className={classes.dropdownItem}
              >
                Sign in
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
          <ClickAwayListener onClickAway={this.handleClose}>
            <MenuList role="menu">
              <MenuItem
                onClick={() => {
                  this.props.history.push(`/SignUp`);
                }}
                className={classes.dropdownItem}
              >
                Sign up
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </div>
      );
    }
    return (
      <div className={classes.manager}>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p onClick={this.handleClick} className={classes.linkText}>
              {this.props.Authorization.authEmail}
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>{this.list}</Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    );
  }
}
const HeaderRouter = withRouter(withStyles(headerLinksStyle)(HeaderLinks));

export default connect(
  state => ({
    Authorization: state[3]
  }),
  action => ({
    SignOut: base => {
      action({
        type: "SignOut",
        payload: {
          authBool: false,
          authEmail: "Guest",
          authBASE: [...base]
        }
      });
    }
  })
)(withStyles(headerLinksStyle)(HeaderRouter));
