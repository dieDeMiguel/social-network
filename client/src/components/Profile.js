import TextEditor from "./BioEditor";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Profile({ user, onTextSave }) {
    return (
        <section className="profile">
            <p className="p-wrapper">
                <img
                    src={user.profilePicURL || "/avatar.png"}
                    alt=""
                    className="profile-img"
                />
            </p>
            <div className="aside">
                <h2>
                    <strong>
                        {user.firstName} {user.lastName} id: {user.id}
                    </strong>
                </h2>
                <div className="bio-editor">
                    <TextEditor text={user.bio} onTextSave={onTextSave} />
                </div>
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
