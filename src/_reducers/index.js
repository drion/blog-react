import { combineReducers } from "redux";

import authentication, * as fromAuthentication from "./authentication.reducer";
import user, * as fromUsers from "./user.reducer";
import posts, * as fromPosts from "./post.reducer";
import userPosts, * as fromUserPosts from "./userPost.reducer";
import comments, * as fromComments from "./comments.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    posts,
    userPosts,
    comments
});

export default rootReducer;

// Auth

export const isAuthenticated = state =>
    fromAuthentication.isAuthenticated(state.authentication);

// User

export const getShowUser = state => fromUsers.getShowUser(state.user);

export const getCurrentUser = state => fromUsers.getCurrentUser(state.user);

// Posts selectors

export const getAllPosts = state => fromPosts.getAllPosts(state.posts);

export const retrievePost = (state, id) =>
    fromPosts.retrievePost(state.posts, id);

export const getPostsIsLoading = state =>
    fromPosts.getPostsIsLoading(state.posts);

export const getPostsById = state => fromPosts.getPostsById(state.posts);

// User posts
export const getAllUserPosts = state =>
    fromUserPosts.getAllUserPosts(state.userPosts);

export const retrieveUserPost = (state, id) =>
    fromUserPosts.retrieveUserPost(state.userPosts, id);

export const getUserPostsIsLoading = state =>
    fromUserPosts.getUserPostsIsLoading(state.userPosts);

export const getUserPostsById = state =>
    fromUserPosts.getUserPostsById(state.userPosts);

// Comments

export const getAllComments = state =>
    fromComments.getAllComments(state.comments);
