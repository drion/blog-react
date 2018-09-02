import postConstants from "../_constants/post.constants";
import postService from "../_services/post.service";

function getAllPosts() {
    function request() {
        return { type: postConstants.GET_ALL_POSTS_REQUEST };
    }

    function success(payload) {
        return { type: postConstants.GET_ALL_POSTS_SUCCESS, payload };
    }

    function failure(error) {
        return { type: postConstants.GET_ALL_POSTS_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return postService.getAllPosts().then(
            payload => {
                dispatch(success(payload));
                return payload;
            },
            error => dispatch(failure(error))
        );
    };
}

const postActions = {
    getAllPosts
};

export default postActions;
