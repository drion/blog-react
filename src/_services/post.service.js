import axios from "axios";

import authHeader from "../_helpers/auth-header";

const getAllPosts = () => axios.get("/api/posts/").then(res => res.data);

const getUserPosts = id =>
    axios.get(`/api/users/${id}/posts/`).then(res => res.data);

const getPost = id => axios.get(`/api/post/${id}/`).then(res => res.data);

const getPostComments = id =>
    axios.get(`/api/posts/${id}/comments/`).then(res => res.data);

const createPost = data =>
    axios
        .post("/api/posts/", data, { headers: authHeader() })
        .then(res => res.data);

const createComment = data =>
    axios
        .post(`/api/posts/${data.post}/comments/`, data, {
            headers: authHeader()
        })
        .then(res => res.data);

const postService = {
    getAllPosts,
    getUserPosts,
    createPost,
    getPost,
    getPostComments,
    createComment
};

export default postService;
