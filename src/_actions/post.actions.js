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

function getUserPosts(id) {
    function request() {
        return { type: postConstants.GET_USER_POSTS_REQUEST };
    }

    function success(payload) {
        console.log(payload);
        return { type: postConstants.GET_USER_POSTS_SUCCESS, payload };
    }

    function failure(error) {
        return { type: postConstants.GET_USER_POSTS_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return postService.getUserPosts(id).then(
            payload => {
                dispatch(success(payload));
            },
            error => dispatch(failure(error))
        );
    };
}

function createPost(data) {
    function request() {
        return { type: postConstants.CREATE_POST_REQUEST };
    }

    function success(post) {
        return { type: postConstants.CREATE_POST_SUCCESS, post };
    }

    function failure(error) {
        return { type: postConstants.CREATE_POST_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return postService.createPost(data).then(
            payload => {
                dispatch(success(payload));
                return payload;
            },
            error => dispatch(failure(error))
        );
    };
}

function getPostComments(id) {
    function request() {
        return { type: postConstants.GET_POST_COMMENTS_REQUEST };
    }

    function success(payload) {
        return { type: postConstants.GET_POST_COMMENTS_SUCCESS, payload };
    }

    function failure(error) {
        return { type: postConstants.GET_POST_COMMENTS_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return postService.getPostComments(id).then(
            payload => {
                dispatch(success(payload));
                return payload;
            },
            error => dispatch(failure(error))
        );
    };
}

function createComment(data) {
    function request() {
        return { type: postConstants.CREATE_COMMENT_REQUEST };
    }

    function success(comment) {
        return { type: postConstants.CREATE_COMMENT_SUCCESS, comment };
    }

    function failure(error) {
        return { type: postConstants.CREATE_COMMENT_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return postService.createComment(data).then(
            payload => {
                dispatch(success(payload));
                return payload;
            },
            error => dispatch(failure(error))
        );
    };
}

const postActions = {
    getAllPosts,
    getUserPosts,
    createPost,
    getPostComments,
    createComment
};

export default postActions;
