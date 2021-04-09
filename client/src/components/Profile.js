import TextEditor from "./BioEditor";

function Profile({ user, onTextSave }) {
    return (
        <section className="profile">
            <p>
                {user.firstName} {user.lastName} id: {user.id}
            </p>
            <p>
                <img src={user.profilePicURL} alt="" className="bio-img" />
            </p>
            <TextEditor text={user.bio} onTextSave={onTextSave} />
        </section>
    );
}

export default Profile;
