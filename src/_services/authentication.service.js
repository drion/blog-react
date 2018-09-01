import axios from "axios";

const login = data =>
    axios.post("/api/auth/login/", data).then(res => res.data);

const authenticationService = {
    login
};

export default authenticationService;
