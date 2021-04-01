const DEFAULT_AVATAR = "./public/avatar.png";

export default function ProfilePicture({
    firstName,
    lstName,
    profilePicURL,
    onClick,
}) {
    const src = profilePicURL || DEFAULT_AVATAR;
    const initials = `${firstName[0]}${lstName[0]}`;
    return (
        <img
            className="profile-picture"
            src={src}
            alt={initials}
            onClick={onClick}
        />
    );
}
