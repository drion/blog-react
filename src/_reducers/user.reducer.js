import userConstants from "../_constants/user.constants";
import authenticationConstants from "../_constants/authentication.constants";

const initialState = {
    isLoading: false
};

export default function user(state = initialState, action) {
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
            return {
                ...initialState,
                ...action.user
            };

        case userConstants.GET_CURRENT_FAILURE:
            return { ...initialState };
        default:
            return state;
    }
}
