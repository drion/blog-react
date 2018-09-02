import React from "react";

import { connect } from "react-redux";

import userActions from "../_actions/user.actions";
import postActions from "../_actions/post.actions";
import { getShowUser, getAllUserPosts } from "../_reducers/";

class UserPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getShowUser(this.props.match.params.id);
        this.props.getUserPosts(this.props.match.params.id);
    }

    render() {
        const { showUser } = this.props;
        return showUser.isLoading ? null : (
            <div>
                <h1>{showUser.username} posts</h1>
                <p />
                <p>Posts</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showUser: getShowUser(state),
    posts: getAllUserPosts(state)
});

export default connect(
    mapStateToProps,
    {
        getShowUser: userActions.getShowUser,
        getUserPosts: postActions.getUserPosts
    }
)(UserPage);
