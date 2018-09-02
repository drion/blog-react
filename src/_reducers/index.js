import { combineReducers } from "redux";

import authentication, * as fromAuthentication from "./authentication.reducer";
import user from "./user.reducer";
import posts, * as fromPosts from "./post.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    posts
});

export default rootReducer;

// User

export const isAuthenticated = state =>
    fromAuthentication.isAuthenticated(state.authentication);

// Posts selectors

export const getAllPosts = state => fromPosts.getAllPosts(state.posts);

export const retrievePost = (state, id) =>
    fromPosts.retrievePost(state.posts, id);

export const getPostsIsLoading = state =>
    fromPosts.getPostsIsLoading(state.posts);

export const getPostsById = state => fromPosts.getPostsById(state.posts);
