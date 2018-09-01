import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import SignupForm from "./SignupForm";
import authenticationAction from "../_actions/authentication.actions";

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    loginPaper: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
        maxWidth: 400,
        width: "100%"
    }
});

class SignupPage extends React.Component {
    state = {};

    handleSubmit = data => this.props.signup(data);

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.loginPaper} elevation={1}>
                    <SignupForm onSubmit={this.handleSubmit} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(
    connect(
        null,
        { signup: authenticationAction.signup }
    )(SignupPage)
);
