import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    textField: {
        width: "100%"
    },

    button: {
        maxWidth: 156,
        marginTop: 12,
        width: "100%"
    }
});

class SignupForm extends React.Component {
    state = {
        data: {
            username: "",
            password: "",
            passwordRepeat: ""
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            const { username, password } = this.state.data;
            this.props.onSubmit({ username, password }).catch(err =>
                this.setState({
                    errors: err.response.data.errors,
                    loading: false
                })
            );
        }
    };

    validate = data => {
        const errors = {};
        const { username, password, passwordRepeat } = data;

        if (!username || !username.length)
            errors.username = "Username is required";

        if (!password || !password.length)
            errors.password = "Password is required";

        if (!passwordRepeat || !passwordRepeat.length)
            errors.passwordRepeat = "Password is required";

        if (password && passwordRepeat && password !== passwordRepeat)
            errors.passwordRepeat = "Passwords don`t match";

        return errors;
    };

    render() {
        const { errors, data, loading } = this.state;
        const { classes } = this.props;

        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <TextField
                    id="username"
                    label="Username"
                    name="username"
                    className={classes.textField}
                    error={Boolean(errors.username)}
                    value={data.username}
                    onChange={this.onChange}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    className={classes.textField}
                    error={Boolean(errors.password)}
                    onChange={this.onChange}
                    margin="normal"
                />
                <TextField
                    id="passwordRepeat"
                    label="Password repeat"
                    name="passwordRepeat"
                    type="password"
                    value={data.passwordRepeat}
                    className={classes.textField}
                    error={Boolean(errors.passwordRepeat)}
                    onChange={this.onChange}
                    margin="normal"
                />
                <Link to="/login">Login</Link>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Signup
                </Button>
            </form>
        );
    }
}

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(SignupForm);
