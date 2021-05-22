import axios from "../../axios";
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
                created_at: "",
            },
            showBioText: false,
        };
        this.showBio = this.showBio.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/api/users/${this.props.id}`)
            .then((response) => {
                var time = Date.now(response.data.created_at);
                time = new Date(time).toLocaleString();
                time = time.split(",")[0];
                return this.setState({
                    user: {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        bio: response.data.bio,
                        profilePicURL: response.data.profile_url,
                        created_at: time,
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
            <>
                <script
                    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
                    defer=""
                ></script>
                <section className="px-5">
                    <div className="container py-16 mx-auto rounded-xl">
                        <div
                            className="shadow rounded-xl"
                            x-data="{ tab: 'preview2' }"
                        >
                            <div
                                className=" rounded-b-xl"
                                x-show="tab === 'preview2'"
                            >
                                <section className="text-gray-700 body-font">
                                    <div className="container flex flex-col items-center px-5 py-10 mx-auto md:flex-row lg:px-28">
                                        <div className="flex flex-col w-full pt-0 sm:mb-6 text-left lg:flex-grow md:w-1/2 xl:mr-6 md:pr-2 md:items-start md:mb-0 xl:max-h-96">
                                            <h2 className="mb-1 text-xs font-medium tracking-widest text-blue-500black title-font"></h2>
                                            <h1 className="mb-2 text-5xl font-bold tracking-tighter text-left text-black lg:text-5xl title-font">
                                                {firstName} {lastName}
                                            </h1>
                                            <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4 ">
                                                <div
                                                    className="flex flex-col items-start p-4 text-left md:w-11/12 md:mb-0"
                                                    style={{
                                                        minHeight: "50vh",
                                                    }}
                                                >
                                                    <div className="flex-grow">
                                                        <h2 className="mb-3 text-lg font-medium tracking-tighter text-gray-700 title-font">
                                                            Member since{" "}
                                                            {
                                                                this.state.user
                                                                    .created_at
                                                            }
                                                        </h2>
                                                        <p className="text-base leading-relaxed">
                                                            {bio ||
                                                                "No bio text yet"}
                                                        </p>
                                                        <div className="links flex flex-col">
                                                            <FriendButton
                                                                id={
                                                                    this.props
                                                                        .id
                                                                }
                                                                showBioProfile={
                                                                    this.showBio
                                                                }
                                                            ></FriendButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shadow-xl">
                                            <img
                                                className="profile-img"
                                                id="profile-img"
                                                src={
                                                    profilePicURL ||
                                                    "/avatar.png"
                                                }
                                                alt={`${this.state.firstName} ${this.state.lastName}`}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div
                                className=" rounded-b-2xl"
                                x-show="tab === 'code2'"
                                style={{ display: "none" }}
                            >
                                <div className="h-screen overflow-auto overflow-y-scroll bg-blueGray-900 text-blueGray-200 rounded-b-xl code-tab">
                                    <div className="rounded-b-xl">
                                        <div className="hidden" id="headerTwo">
                                            <section className="text-gray-700 body-font">
                                                <div className="container flex flex-col items-center px-5 py-10 mx-auto md:flex-row lg:px-28">
                                                    <div className="flex flex-col w-full pt-0 lg:mb-16 text-left lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:items-start md:mb-0 ">
                                                        <h2 className="mb-1 text-xs font-medium tracking-widest text-blue-500black title-font"></h2>
                                                        <h1 className="text-5xl font-bold tracking-tighter text-left text-black lg:text-5xl title-font">
                                                            {firstName}'s
                                                            profile:
                                                        </h1>
                                                        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4 ">
                                                            <div className="flex flex-col items-start p-4 md:mb-6 text-left md:w-11/12 md:mb-0">
                                                                <div className="flex-grow">
                                                                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-gray-700 title-font">
                                                                        Member
                                                                        since{" "}
                                                                        {
                                                                            this
                                                                                .state
                                                                                .created_at
                                                                        }
                                                                    </h2>
                                                                    <p className="text-base leading-relaxed">
                                                                        {this
                                                                            .state
                                                                            .bio ||
                                                                            "No bio text yet"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full lg:w-5/6 lg:max-w-lg md:w-1/2 mt-6 md:mt-0 shadow-xl">
                                                        <img
                                                            className="object-cover object-center rounded-lg "
                                                            alt="hero"
                                                            src={
                                                                this.state
                                                                    .profilePicURL
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default OtherProfile;
