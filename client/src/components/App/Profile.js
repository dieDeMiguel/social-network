import TextEditor from "./BioEditor";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "../../axios";

function Profile({ user, onTextSave, onProfilePictureClick }) {
    function onDeleteClick() {
        if (!confirm("are you sure?")) {
            return;
        }
        axios
            .delete(`/user`)
            .then((result) => {
                window.location.href = "/";
            })
            .catch((error) =>
                console.log("Error while deleting account", error)
            );
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                    <div className="p-4 border-b">
                        <h2 className="text-2xl ">Superhero Profile</h2>
                        <p className="text-sm text-gray-500">
                            Superhero #: {user.id}
                        </p>
                    </div>
                    <div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Full name</p>
                            <p>
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Member since</p>
                            <p>{user.created_at}</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Email Address</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Bio</p>
                            <TextEditor
                                text={user.bio}
                                onTextSave={onTextSave}
                            />
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                            <p className="text-gray-600">Attachments</p>
                            <div className="space-y-2">
                                <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                                    <div className="space-x-2 truncate">
                                        <p className="p-wrapper">
                                            <img
                                                id="profile-img"
                                                onClick={onProfilePictureClick}
                                                src={
                                                    user.profilePicURL ||
                                                    "/avatar.png"
                                                }
                                                alt=""
                                                className="profile-img"
                                            />
                                        </p>
                                    </div>
                                    <button
                                        onClick={onDeleteClick}
                                        className="btn"
                                    >
                                        Delete Account
                                    </button>
                                    <Route>
                                        <Link
                                            to="/users"
                                            className="text-purple-700 hover:underline"
                                        >
                                            Search other users
                                        </Link>
                                    </Route>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
