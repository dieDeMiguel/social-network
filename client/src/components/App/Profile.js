import TextEditor from "./BioEditor";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Profile({ user, onTextSave, onProfilePictureClick }) {
    return (
        <section className="profile">
            <div className="button-image">
                <p className="p-wrapper">
                    <img
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
            </div>
        </section>
    );
}

export default Profile;
