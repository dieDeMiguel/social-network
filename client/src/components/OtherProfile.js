import axios from "axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                bio: "",
                profilePicURL: "",
            },
        };
    }

    componentDidMount() {
        axios
            .get(`/api/users/${this.props.id}`)
            .then((response) => {
                return this.setState({
                    user: {
                        firstName: response.data.first_name,
                        lastName: response.data.firstName,
                        bio: response.data.lastName,
                        profilePicURL: response.data.profile_url,
                    },
                });
            })
            .catch((error) => {
                if (
                    error.response.status >= 400 &&
                    error.response.status < 500
                ) {
                    this.props.history.push("/");
                }
            });
    }
    render() {
        if (!this.state.user) {
            return (
                <section className="profile">
                    <h2>User not found!</h2>
                    <p>
                        <Link to="/">Back to Homepage</Link>
                    </p>
                </section>
            );
        }

        const { firstName, lastName, bio, profilePicURL } = this.state.user;

        return (
            <section className="profile">
                <h2>
                    {firstName} {lastName}
                </h2>
                <p>
                    <img src={profilePicURL} alt={`${firstName} ${lastName}`} />
                </p>
                <p>{bio}</p>
                <p>
                    <Link to="/">Back to Homepage</Link>
                </p>
            </section>
        );
    }
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path="/" exact>
                    <h1>Welcome to SPICED Social Network</h1>
                    <ul>
                        <li>
                            <Link to="/user/1">See User 1</Link>
                        </li>
                        <li>
                            <Link to="/user/2">See User 2</Link>
                        </li>
                        <li>
                            <Link to="/user/3">See User 3</Link>
                        </li>
                    </ul>
                </Route>
                {/* the /user/:id route renders the single user profile */}
                <Route
                    path="/user/:id"
                    render={(props) => (
                        <OtherProfile id={props.match.params.id} />
                    )}
                />
            </div>
        </BrowserRouter>
    );
}
