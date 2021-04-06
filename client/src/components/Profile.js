import TextEditor from "./TextEditor";

function Profile({ user, onTextSave }) {
    console.log("[Profile.js]", user);
    return (
        <section className="profile">
            <p>
                <img src={user.profilePicURL} alt="" />
            </p>
            <TextEditor text={user.bio} onTextSave={onTextSave} />
        </section>
    );
}

export default Profile;
