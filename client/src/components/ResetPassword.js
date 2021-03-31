import { Component } from "react";
import axios from "../axios";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            error: null,
            step: 1,
            code: null,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSendVerificationSubmit = this.onSendVerificationSubmit.bind(
            this
        );
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }
    onSendVerificationSubmit(event) {
        event.preventDefault();
        axios
            .post("/password/reset/start", {
                email: this.state.email,
            })
            .then(() => this.setState({ step: 2 }))
            .catch((error) => {
                this.setState({
                    error:
                        error.response.data.message ||
                        "Error while submiting request",
                });
            });
    }

    onCodeSubmit(event) {
        event.preventDefault();
        axios
            .post("/password/reset/verify", {
                email: this.state.email,
                passwors: this.state.password,
                code: this.state.code,
            })
            .then(() => this.setState({ step: 3 }))
            .catch((error) => {
                this.setState({
                    error:
                        error.response.data.message ||
                        "Error while submiting request",
                });
            });
    }

    onInputChange(event, callback) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log("[ResetPassword] onInputChange this.setState", this.state);
    }

    renderError() {
        if (this.state.error) {
            return <p className="error-message">{this.state.error}</p>;
        }
        return null;
    }
    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <div className="form">
                        {this.renderError()}
                        <form onSubmit={this.onSendVerificationSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={this.onInputChange}
                                required
                            />
                            <button type="submit">
                                Send Verification Code
                            </button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div className="form">
                        {this.renderError()}
                        <form onSubmit={this.onCodeSubmit}>
                            <p>
                                We sent you an email with a code, you have 10
                                minutes to use it
                            </p>
                            <input
                                type="text"
                                name="code"
                                placeholder="Please paste here the copy you received by email"
                                onChange={this.onInputChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Please type here your new password"
                                onChange={this.onInputChange}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <p>
                        Now you can <Link to="/login">login</Link> with your new
                        password!
                    </p>
                );
            default:
                return (
                    <p>
                        "something went wrong, go back to"{" "}
                        <Link to="/register">Register</Link>
                    </p>
                );
        }
    }
}

export default ResetPassword;
