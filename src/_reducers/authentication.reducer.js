import authenticationConstants from "../_constants/authentication.constants";

const initialState = {
    isLoading: false,
    token: null
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case authenticationConstants.LOGIN_REQUEST:
        case authenticationConstants.SIGNUP_REQUEST:
            return {
                ...initialState,
                isLoading: true
            };

        case authenticationConstants.LOGIN_SUCCESS:
        case authenticationConstants.SIGNUP_SUCCESS:
            return {
                ...initialState,
                token: action.token
            };

        case authenticationConstants.LOGIN_FAILURE:
        case authenticationConstants.SIGNUP_FAILURE:
            return { ...initialState };

        case authenticationConstants.LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
}

export const isAuthenticated = state => state.token;
