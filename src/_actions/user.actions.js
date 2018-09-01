import userConstants from "../_constants/user.constants";
import userService from "../_services/user.service";

function getCurrentUser() {
    function request() {
        return { type: userConstants.GET_CURRENT_REQUEST };
    }

    function success(payload) {
        return { type: userConstants.GET_CURRENT_SUCCESS, payload };
    }

    function failure(error) {
        return { type: userConstants.GET_CURRENT_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return userService.getCurrentUser().then(
            payload => {
                dispatch(success(payload));
                return payload;
            },
            error => dispatch(failure(error))
        );
    };
}

const userActions = {
    getCurrentUser
};

export default userActions;
