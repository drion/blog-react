import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import authenticationConstants from "../_constants/authentication.constants";

const initialState = {
    isLoading: false
};

export function current(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_CURRENT_REQUEST:
            return {
                ...initialState,
                isLoading: true
            };
        case userConstants.GET_CURRENT_SUCCESS:
            return {
                ...initialState,
                ...action.payload
            };

        case authenticationConstants.LOGIN_SUCCESS:
        case authenticationConstants.SIGNUP_SUCCESS:
            return {
                ...initialState,
                ...action.user
            };

        case userConstants.GET_CURRENT_FAILURE:
        case authenticationConstants.LOGIN_FAILURE:
        case authenticationConstants.SIGNUP_FAILURE:
        case authenticationConstants.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export function show(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_SHOW_USER_REQUEST:
            return {
                ...initialState,
                isLoading: true
            };
        case userConstants.GET_SHOW_USER_SUCCESS:
            return {
                ...initialState,
                ...action.payload
            };

        case userConstants.GET_SHOW_USER_FAILURE:
        case authenticationConstants.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

const user = combineReducers({
    current,
    show
});

export default user;

export const getShowUser = state => state.show;

export const getCurrentUser = state => state.current;

