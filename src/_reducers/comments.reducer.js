import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import postConstants from "../_constants/post.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case postConstants.GET_POST_COMMENTS_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(comment => {
                nextState[comment.id] = comment;
            });

            return nextState;
        }

        case postConstants.CREATE_COMMENT_SUCCESS: {
            console.log(action);
            const nextState = { ...state };
            const { comment } = action;
            nextState[comment.id] = comment;

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
        case postConstants.GET_POST_COMMENTS_SUCCESS:
            return action.payload.map(post => post.id);

        case postConstants.CREATE_COMMENT_SUCCESS:
            return [...state, action.comment.id];

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case postConstants.GET_POST_COMMENTS_REQUEST:
            return true;
        case postConstants.GET_POST_COMMENTS_SUCCESS:
        case postConstants.GET_POST_COMMENTS_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

const comments = combineReducers({
    isLoading,
    byId,
    allIds
});

export default comments;

export const getAllComments = state => state.allIds.map(id => state.byId[id]);

export const retrieveComment = (state, id) => state.byId[id];

export const getCommentIsLoading = state => state.isLoading;

export const getCommentsById = state => ({ ...state.byId });
