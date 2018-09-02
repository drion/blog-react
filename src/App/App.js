import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router";

import Header from "../_components/general/Header";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import UserPage from "../UserPage/UserPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import PostPage from "../PostPage/PostPage";

const App = ({ location }) => (
    <div className="container">
        <Header />
        <Route location={location} exact path="/" component={HomePage} />
        <Route location={location} exact path="/login" component={LoginPage} />
        <Route
            location={location}
            exact
            path="/signup"
            component={SignupPage}
        />
        <Route
            location={location}
            exact
            path="/users/:id"
            component={UserPage}
        />
        <Route
            location={location}
            exact
            path="/posts/new"
            component={NewPostPage}
        />
        <Route
            location={location}
            exact
            path="/posts/:id(\d+)"
            component={PostPage}
        />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
