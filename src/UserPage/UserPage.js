import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import userActions from "../_actions/user.actions";
import postActions from "../_actions/post.actions";
import { getShowUser, getAllUserPosts } from "../_reducers/";

import PostsList from "../HomePage/PostsList";

const styles = {
    root: {
        maxWidth: 700,
        margin: "0 auto"
    }
};

class UserPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getShowUser(this.props.match.params.id);
        this.props.getUserPosts(this.props.match.params.id);
    }

    render() {
        const { showUser, posts, classes } = this.props;
        return showUser.isLoading ? null : (
            <div className={classes.root}>
                <h1>{showUser.username} posts</h1>
                {posts.length > 0 ? (
                    <PostsList posts={posts} />
                ) : (
                    <p>No posts to show</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showUser: getShowUser(state),
    posts: getAllUserPosts(state)
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        {
            getShowUser: userActions.getShowUser,
            getUserPosts: postActions.getUserPosts
        }
    )(UserPage)
);
