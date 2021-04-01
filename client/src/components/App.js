import { Component } from "react";
import axios from "../axios";
import ProfilePicture from "./ProfilePicture";
import ProfilePictureUploader from "./ProfilePictureUploader";

import ProfilePicture from "./ProfilePicture";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                profilePicURL: "",
            },
            showModal: true,
            isLoading: false,
        };

        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        this.setState({ isLoading: true });

        const formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload-picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.setState({ isLoading: false });
                this.props.onUpload(response.data.profilePicURL);
            });
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("[App] componentDidMount", response.data);
            this.setState({
                user: response.data,
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

    render() {
        return (
            <section className="app">
                <header>
                    <span className="logo">Logo</span>
                    <ProfilePicture
                        firstName={this.state.user.firstName}
                        lastName={this.state.user.lastName}
                        profilePicURL={this.state.user.profilePicURL}
                        onClick={this.onProfilePictureClick}
                    />
                </header>
                {this.renderModal()}
            </section>
        );
    }
    renderModal() {
        if (this.state.showModal) {
            return (
                <ProfilePictureUploader
                    onUpload={this.onProfilePictureUpload}
                />
            );
        }
        return null;
    }
}

export default App;
