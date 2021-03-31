import { Component } from "react";
import axios from "../axios";

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

        // this solve the 'cannot access setState of undefined method
        // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/users-failing", this.state)
            .then((response) => {
                console.log("[RegistrationForm] axios succes:", response);
            })
            .catch((error) => {
                console.log(
                    "[RegistrationForm] axios error",
                    error.response.data
                );
                this.setState({ error: error.response.data.message });
            });
    }

    onInputChange(event, callback) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log(
            "[RegistrationForm] onInputChange this.setState",
            this.state
        );

        // logging this.state will NOT give you the updated state.
        // to access that right away, you can pass a callback as the second argument of this.setState, e.g.:
        this.setState(newState, () => console.log(this.state) ));
    }

    renderError() {
        if (this.state.error) {
            return <p className="error-message">{this.state.error}</p>;
        }
        return null;
    }
    render() {
        return (
            <div className="registration-form">
                {this.renderError()}
                <form onSubmit={this.onFormSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onInputChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
