import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

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
        width: "100%"
    }
});

class LoginPage extends React.Component {
    state = {
        data: {},
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
            this.props.submit(this.state.data).catch(err =>
                this.setState({
                    errors: err.response.data.errors,
                    loading: false
                })
            );
        }
    };

    validate = data => {
        const errors = {};
        return errors;
    };

    render() {
        const { errors, data, loading } = this.state;
        const { classes } = this.props;

        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <TextField
                    required
                    id="username"
                    label="Username"
                    name="username"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Submit
                </Button>
            </form>
        );
    }
}

LoginPage.propTypes = {
    submit: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginPage);
