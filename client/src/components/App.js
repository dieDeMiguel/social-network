import { Component } from "react";
import axios from "../axios";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import ProfilePictureUploader from "./ProfilePictureUploader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
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
        this.onTextSave = this.onTextSave.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("[App] componentDidMount", response.data);
            this.setState({
                user: {
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

    onTextSave(newText) {
        console.log("[App] onTextSave: ", newText);
        this.setState({
            user: {
                ...this.state.user,
                bio: newText,
            },
        });
        console.log("[App] onTextSave after setSate: ", this.state.bio);
    }

    render() {
        return (
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
                <div className="padding">{this.renderModal()}</div>
                <Profile
                    user={this.state.user}
                    onTextSave={this.onTextSave}
                ></Profile>
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
    renderModal() {
        if (this.state.showModal) {
            return (
                <ProfilePictureUploader
                    onUpload={this.onUpload}
                    onClose={this.onModalClose}
                />
            );
        }
        return null;
    }
}

export default App;
