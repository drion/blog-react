import authenticationConstants from "../_constants/authentication.constants";
import authenticationService from "../_services/authentication.service";
import history from "../_helpers/history";

function login(username, password) {
    function request() {
        return { type: authenticationConstants.LOGIN_REQUEST };
    }

    function success(payload) {
        return { type: authenticationConstants.LOGIN_SUCCESS, ...payload };
    }

    function failure(error) {
        return { type: authenticationConstants.LOGIN_FAILURE, error };
    }

    return dispatch => {
        dispatch(request({ username }));

        return authenticationService.login(username, password).then(
            payload => {
                dispatch(success(payload));
                history.push("/");
            },
            error => dispatch(failure(error))
        );
    };
}

function signup(username, password) {
    function request() {
        return { type: authenticationConstants.SIGNUP_REQUEST };
    }

    function success(payload) {
        return { type: authenticationConstants.SIGNUP_SUCCESS, ...payload };
    }

    function failure(error) {
        return { type: authenticationConstants.SIGNUP_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return authenticationService.signup(username, password).then(
            payload => {
                dispatch(success(payload));
                history.push("/");
            },
            error => dispatch(failure(error))
        );
    };
}

function logout() {
    return { type: authenticationConstants.LOGOUT };
}

const authenticationActions = {
    login,
    signup,
    logout
};

export default authenticationActions;
