import { Component } from "react";
import ResetPassword from "./ResetPassword";

class Recover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: "",
                lastName: "",
                profilePicURL: "",
            },
        };
    }

    render() {
        return (
            <section className="app">
                <header>
                    <span className="logo">
                        <a href="/">
                            <img src="/logo.jpeg"></img>
                        </a>
                    </span>
                </header>
                <ResetPassword></ResetPassword>
                <footer>
                    <form onSubmit={this.onLogout}>
                        <button type="submit" className="btn-logout">
                            Logout
                        </button>
                    </form>
                </footer>
            </section>
        );
    }
}

export default Recover;
