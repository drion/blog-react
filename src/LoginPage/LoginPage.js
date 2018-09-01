import React from "react";

import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
    state = {};

    handleSubmit = data => {
        console.log(data);
    };

    render() {
        return (
            <div>
                <LoginForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default LoginPage;
