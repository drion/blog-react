import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import postActions from "../_actions/post.actions";
import PostsList from "./PostsList";

const styles = {
    root: {
        maxWidth: 700,
        margin: "0 auto"
    }
};

class HomePage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>All posts</h1>
                <PostsList />
            </div>
        );
    }
}

export default withStyles(styles)(
    connect(
        null,
        { getAllPosts: postActions.getAllPosts }
    )(HomePage)
);
