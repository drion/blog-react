import axios from "axios";

import authHeader from "../_helpers/auth-header";

const getCurrentUser = () =>
    axios.get("/api/users/me/", { headers: authHeader() });

const userService = {
    getCurrentUser
};

export default userService;
