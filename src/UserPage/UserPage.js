import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import userActions from "../_actions/user.actions";
import postActions from "../_actions/post.actions";
import { getShowUser, getAllUserPosts, getCurrentUser } from "../_reducers/";
import history from "../_helpers/history";

import PostsList from "../HomePage/PostsList";

const styles = {
    root: {
        maxWidth: 624,
        margin: "0 auto"
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
};

class UserPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getShowUser(this.props.match.params.id);
        this.props.getUserPosts(this.props.match.params.id);
    }

    render() {
        const { showUser, posts, classes, currentUser } = this.props;
        return showUser.isLoading ? null : (
            <div className={classes.root}>
                <div className={classes.pageHeader}>
                    <h1>{showUser.username} posts</h1>
                    {currentUser.id == this.props.match.params.id && (
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => history.push("/posts/new")}
                        >
                            Add post
                        </Button>
                    )}
                </div>
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
    posts: getAllUserPosts(state),
    currentUser: getCurrentUser(state)
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
