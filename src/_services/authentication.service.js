import axios from "axios";

const login = data =>
    axios.post("/api/auth/login/", data).then(res => res.data);

const signup = data =>
    axios.post("/api/auth/register/", data).then(res => res.data);

const authenticationService = {
    login,
    signup
};

export default authenticationService;
