import { Component } from "react";
import axios from "../../axios";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
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
            .post("/users", this.state)
            .then((response) => {
                console.log("[RegistrationForm] axios succes:", response);
                this.onSuccess();
            })
            .catch((error) => {
                console.log(
                    "[RegistrationForm] axios error",
                    error.response.data
                );
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

        console.log(
            "[RegistrationForm] onInputChange this.setState",
            this.state
        );
    }

    renderError() {
        if (this.state.error) {
            return (
                <h1 className="signup1" id="error">
                    {this.state.error}
                </h1>
            );
        }
        return null;
    }
    render() {
        return (
            <div className="registration-form c2">
                {this.renderError()}
                <form
                    onSubmit={this.onFormSubmit}
                    className="signup"
                    style={{ minWidth: "16rem" }}
                >
                    <h1 className="signup1">SIGN UP</h1>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={this.onInputChange}
                        required
                        className="username"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={this.onInputChange}
                        required
                        className="username"
                    />
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
                    <button
                        type="submit"
                        className="btn"
                        style={{ marginTop: "2rem" }}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
