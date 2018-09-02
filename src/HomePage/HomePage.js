import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import postActions from "../_actions/post.actions";
import PostsList from "./PostsList";

import { getAllPosts } from "../_reducers/";

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
        const { classes, posts } = this.props;
        return (
            <div className={classes.root}>
                <h1>All posts</h1>
                <PostsList posts={posts} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: getAllPosts(state)
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { getAllPosts: postActions.getAllPosts }
    )(HomePage)
);
