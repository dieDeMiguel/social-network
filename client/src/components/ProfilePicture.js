const DEFAULT_AVATAR = "/avatar.png";

export default function ProfilePicture({
    firstName,
    lastName,
    profilePicURL,
    onClick,
}) {
    const src = profilePicURL || DEFAULT_AVATAR;
    const initials = `${firstName[0]}${lastName[0]}`;
    return (
        <img
            className="profile-picture"
            src={src}
            alt={initials}
            onClick={onClick}
        />
    );
}
