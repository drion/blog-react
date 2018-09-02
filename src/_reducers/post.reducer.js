import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import postConstants from "../_constants/post.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case postConstants.GET_ALL_POSTS_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(post => {
                nextState[post.id] = post;
            });

            return nextState;
        }

        case postConstants.CREATE_POST_SUCCESS: {
            const nextState = { ...state };
            const { post } = action;
            nextState[post.id] = post;

            return nextState;
        }

        case postConstants.DELETE_POST_SUCCESS: {
            const nextState = { ...state };
            delete nextState[action.id];
            return nextState;
        }

        case userConstants.LOGOUT:
            return {};

        default:
            return state;
    }
};

export const allIds = (state = [], action) => {
    switch (action.type) {
        case postConstants.GET_ALL_POSTS_SUCCESS:
            return action.payload.map(post => post.id);

        case postConstants.CREATE_POST_SUCCESS:
            return [action.post.id, ...state];

        case postConstants.DELETE_POST_SUCCESS:
            return state.filter(item => item !== action.id);

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case postConstants.GET_ALL_POSTS_REQUEST:
            return true;
        case postConstants.GET_ALL_POSTS_SUCCESS:
        case postConstants.GET_ALL_POSTS_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

const posts = combineReducers({
    isLoading,
    byId,
    allIds
});

export default posts;

export const getAllPosts = state => state.allIds.map(id => state.byId[id]);

export const retrievePost = (state, id) => state.byId[id];

export const getPostsIsLoading = state => state.isLoading;

export const getPostsById = state => ({ ...state.byId });
