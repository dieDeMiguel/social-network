import { Component } from "react";
import axios from "../axios";
import ProfilePicture from "./ProfilePicture";
import Profile from "./Profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FindPeople from "./FindPeople";
import ProfilePictureUploader from "./ProfilePictureUploader";
import OtherProfile from "./OtherProfile";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                profilePicURL: "",
                bio: "",
            },
            showModal: false,
        };

        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onBioSave = this.onBioSave.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("[App] componentDidMount", response.data);
            this.setState({
                user: {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    profilePicURL: response.data.profile_url,
                    bio: response.data.bio,
                },
            });
        });
    }

    onProfilePictureUpload() {
        console.log("[App] onProfilePictureUpload", this);
    }

    onModalClose() {
        console.log("[App] onClose", this);
        this.setState({
            showModal: false,
        });
    }

    onProfilePictureClick() {
        console.log("[App] onProfilePictureClick", this);
        this.setState({
            showModal: true,
        });
    }

    onUpload(newProfilePicURL) {
        this.setState({
            user: {
                ...this.state.user,
                profilePicURL: newProfilePicURL,
            },
        });
    }

    onLogout(event) {
        event.preventDefault();
        axios.post("/logout").then((response) => {
            console.log("[App]:", response.data.message);
            window.location.href = "/welcome";
        });
    }

    onBioSave(newText) {
        axios
            .put("/user", { bioText: newText })
            .then(() => {
                console.log("[App] onTextSave: ", newText);
                this.setState({
                    user: {
                        ...this.state.user,
                        bio: newText,
                    },
                });
            })
            .catch((error) => {
                console.log("[App] Error while sotring bio: ", error);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <section className="app">
                    <header>
                        <span className="logo">
                            <a href="/">
                                {" "}
                                <img src="/logo.jpeg"></img>
                            </a>
                        </span>
                        <ProfilePicture
                            firstName={this.state.user.firstName}
                            lastName={this.state.user.lastName}
                            profilePicURL={this.state.user.profilePicURL}
                            onClick={this.onProfilePictureClick}
                        />
                    </header>
                    {this.renderModal()}
                    <Route path="/" exact>
                        <div className="main-profile">
                            <Profile
                                user={this.state.user}
                                onTextSave={this.onBioSave}
                                onProfilePictureClick={
                                    this.onProfilePictureClick
                                }
                            ></Profile>
                        </div>
                    </Route>
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                id={props.match.params.id}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/users" render={() => <FindPeople />} />
                    <footer>
                        <form onSubmit={this.onLogout}>
                            <button type="submit" className="btn-logout">
                                Logout
                            </button>
                        </form>
                    </footer>
                </section>
            </BrowserRouter>
        );
    }
    renderModal() {
        if (this.state.showModal) {
            return (
                <ProfilePictureUploader
                    onUpload={this.onUpload}
                    onClose={this.onModalClose}
                    onModalClose={this.onModalClose}
                />
            );
        }
        return null;
    }
}

export default App;
