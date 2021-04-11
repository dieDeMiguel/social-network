import axios from "axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FriendButton from "./FriendButton";

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
            showBioText: false,
        };
        this.showBio = this.showBio.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/api/users/${this.props.id}`)
            .then((response) => {
                return this.setState({
                    user: {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        bio: response.data.bio,
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

    showBio() {
        this.setState({ showBioText: true });
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
            <div className="main-profile">
                <section className="profile">
                    <div className="button-image">
                        <p className="p-wrapper">
                            <img
                                className="profile-img"
                                src={profilePicURL || "/avatar.png"}
                                alt={`${firstName} ${lastName}`}
                            />
                        </p>
                        <div className="bio-editor">
                            <FriendButton
                                id={this.props.id}
                                showBioProfile={this.showBio}
                            ></FriendButton>
                        </div>
                    </div>
                    <div className="aside">
                        <h2>
                            <strong>
                                {firstName} {lastName}
                            </strong>
                        </h2>
                        id: {this.props.id}
                        {this.state.showBioText && (
                            <div className="bio-editor">
                                <p className="profile-text">
                                    {firstName}'s profile:
                                </p>
                                <h1 className="bio-text">
                                    {bio || "No bio text yet"}
                                </h1>
                            </div>
                        )}
                        <p>
                            <Link to="/" id="search-others">
                                Back to Homepage
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
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
                            <Link to="/users">Users</Link>
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
