import { Component } from "react";
import axios from "../../axios";
import Header from "../Partials/Header";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./FindPeople";
import ProfilePictureUploader from "./ProfilePictureUploader";
import OtherProfile from "./OtherProfile";
import Footer from "../Partials/Footer";
import Friends from "./Friends";
import Chat from "../Chat/Chat";

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
                email: "",
                created_at: "",
            },
            showModal: false,
        };

        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onBioSave = this.onBioSave.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            let time = Date.now(response.data.created_at);
            time = new Date(time).toLocaleString();
            time = time.split(",")[0];
            this.setState({
                user: {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    profilePicURL: response.data.profile_url,
                    bio: response.data.bio,
                    email: response.data.email,
                    created_at: time,
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
                <>
                    <Header user={this.state.user}></Header>

                    {this.renderModal()}
                    <Route path="/" exact>
                        <Profile
                            user={this.state.user}
                            onTextSave={this.onBioSave}
                            onProfilePictureClick={this.onProfilePictureClick}
                        ></Profile>
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
                    <Route path="/friends" render={() => <Friends />} />
                    <Route path="/chat" render={() => <Chat />} />
                    <Footer user={this.state.user} />
                </>
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
