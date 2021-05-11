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
        <section className="profile">
            <div className="aside">
                <h2>
                    <strong>
                        {user.firstName} {user.lastName}
                    </strong>
                </h2>
                id: {user.id}
                <div className="bio-editor">
                    <TextEditor text={user.bio} onTextSave={onTextSave} />
                </div>
                <button onClick={onDeleteClick} className="btn">
                    Delete Account
                </button>
            </div>
            <div className="button-image">
                <p className="p-wrapper">
                    <img
                        id="profile-img"
                        onClick={onProfilePictureClick}
                        src={user.profilePicURL || "/avatar.png"}
                        alt=""
                        className="profile-img"
                    />
                </p>
                <p className="link">
                    <Route>
                        <Link to="/users" id="search-others">
                            Search other users
                        </Link>
                    </Route>
                </p>
            </div>
        </section>
    );
}

export default Profile;
