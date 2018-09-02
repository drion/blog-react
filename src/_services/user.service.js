import axios from "axios";

import authHeader from "../_helpers/auth-header";

const getCurrentUser = () =>
    axios.get("/api/users/me/", { headers: authHeader() });

const getUser = id => axios.get(`/api/users/${id}/`).then(res => res.data);

const userService = {
    getCurrentUser,
    getUser
};

export default userService;
