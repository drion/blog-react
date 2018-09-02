import React from "react";

import { connect } from "react-redux";

import postActions from "../_actions/post.actions";

class HomePage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        return (
            <div>
                <h1>Hello world</h1>
            </div>
        );
    }
}

export default connect(
    null,
    { getAllPosts: postActions.getAllPosts }
)(HomePage);
