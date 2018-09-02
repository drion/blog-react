import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

import authenticationActions from "../../_actions/authentication.actions";

import { isAuthenticated, getCurrentUser } from "../../_reducers";

const styles = {
    root: {
        flexGrow: 1
    },
    appBar: {
        background: "#a2cf6e"
    },
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    link: {
        textDecoration: "none",
        color: "#111"
    },
    headerLink: {
        textDecoration: "none",
        color: "#fff"
    }
};

class MenuAppBar extends React.Component {
    state = {
        anchorEl: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, auth, user } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            <Link to="/" className={classes.headerLink}>
                                MyBlog
                            </Link>
                        </Typography>
                        {auth ? (
                            <div>
                                <IconButton
                                    aria-owns={open ? "menu-appbar" : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className={classes.link}
                                        >
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        <Link
                                            to={`/posts/new`}
                                            className={classes.link}
                                        >
                                            Add post
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.props.logout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button>
                                <Link
                                    to="/login"
                                    className={classes.headerLink}
                                >
                                    Login
                                </Link>
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: isAuthenticated(state),
    user: getCurrentUser(state)
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { logout: authenticationActions.logout }
    )(MenuAppBar)
);
