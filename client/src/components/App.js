import { Component } from "react";
import axios from "../axios";

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
            showModal,
        };

        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentDidMount() {
        // GET /user
        // .then() set the state with the according response.data
    }

    onProfilePictureClick() {
        console.log("[App] onProfilePictureClick", this);
        this.setState({
            showModal: true,
        });
    }

    onModalClose() {
        // hide the modal
    }

    onUpload(newProfilePicURL) {
        // set the state accordingly
        // remember to user destructuring:
        this.setState({
            user: {
                ...this.state.user, // what the user was before
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
            // return the modal component
        }
        return null;
    }
}

export default App;
