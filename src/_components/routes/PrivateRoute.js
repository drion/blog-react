import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}).isRequired
};

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        isAuthenticated: Boolean(authentication.token)
    };
}

export default connect(mapStateToProps)(PrivateRoute);
