import { Component } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import ProfilePicture from "../App/ProfilePicture";

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
        this.onSendVerificationSubmit =
            this.onSendVerificationSubmit.bind(this);
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
        console.log("[ResetPassword] onCodeSubmit", event.target.value);
        event.preventDefault();
        axios
            .post("/password/reset/verify", {
                email: this.state.email,
                password: this.state.password,
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

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log(
            "[ResetPassword] onInputChange this.setState",
            this.state,
            event.target.value,
            event.target.name
        );
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
                    <div className="form c2 c2-login shadow-lg">
                        <h1 className="signup1">Step 1: Enter your email</h1>
                        {this.renderError()}
                        <form
                            onSubmit={this.onSendVerificationSubmit}
                            className="signup signup-login"
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={this.onInputChange}
                                required
                                className="username"
                            />
                            <button type="submit" className="btn">
                                Send Verification
                            </button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div className="form c2 c2-login step-2">
                        {this.renderError()}
                        <form
                            onSubmit={this.onCodeSubmit}
                            className="signup signup-login step-2"
                        >
                            <h1 className="signup1">
                                Step 2: Enter here the code
                            </h1>
                            <input
                                type="text"
                                name="code"
                                placeholder="Paste the code here"
                                onChange={this.onInputChange}
                                required
                                className="username"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="New password"
                                onChange={this.onInputChange}
                                required
                                className="username"
                            />
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div className="form c2 c2-login step-2">
                        <form className="signup signup-login step-2">
                            <h1 className="signup1">
                                Password changed: <Link to="/login">login</Link>{" "}
                                with your new password!
                            </h1>
                        </form>
                    </div>
                );
            default:
                return (
                    <p>
                        "something went wrong"{" "}
                        <Link to="/register">Register</Link>
                    </p>
                    // eslint-disable-next-line indent
                );
        }
    }
}

export default ResetPassword;
