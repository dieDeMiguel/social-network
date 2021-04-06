import TextEditor from "./TextEditor";

function Profile({ user, onTextSave }) {
    return (
        <section className="profile">
            <p>
                <img src={user.profilePicURL} alt="" className="bio-img" />
            </p>
            <TextEditor text={user.bio} onTextSave={onTextSave} />
        </section>
    );
}

export default Profile;
