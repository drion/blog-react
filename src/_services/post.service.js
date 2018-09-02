import axios from "axios";

import authHeader from "../_helpers/auth-header";

const getAllPosts = () => axios.get("/api/posts/").then(res => res.data);

const postService = {
    getAllPosts
};

export default postService;
