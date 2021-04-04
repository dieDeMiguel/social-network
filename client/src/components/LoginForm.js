import { Component } from "react";
import axios from "../axios";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: null,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }
    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log("[LoginForm] axios succes:", response);
                this.onSuccess();
            })
            .catch((error) => {
                console.log("[LoginForm] axios error", error.response.data);
                this.setState({ error: error.response.data.message });
            });
    }

    onSuccess() {
        this.props.onSuccess();
    }

    onInputChange(event, callback) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log("[LoginForm] onInputChange this.setState", this.state);
    }

    renderError() {
        if (this.state.error) {
            return <p className="error-message">{this.state.error}</p>;
        }
        return null;
    }
    render() {
        return (
            <div className="login-form c2 c2-login">
                {this.renderError()}
                <form
                    onSubmit={this.onFormSubmit}
                    className="signup signup-login"
                >
                    <h1 className="signup1">Login</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onInputChange}
                        required
                        className="username"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onInputChange}
                        required
                        className="username"
                    />
                    <button type="submit" className="btn btn-login">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
