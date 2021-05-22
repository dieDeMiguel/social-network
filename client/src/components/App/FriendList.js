import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function FriendList({
    users,
    onClick,
    onRejectClick,
    onCancelClick,
    outgoing,
}) {
    return !outgoing ? (
        <ul style={{ display: "flex", justifyContent: "center" }}>
            {users.map(({ accepted, user }) => (
                <li key={user.id}>
                    <ProfilePicture
                        firstName={user.first_name}
                        lastName={user.last_name}
                        profilePicURL={user.profile_url}
                    />
                    <div className="content">
                        <Link to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                        {accepted ? (
                            <button
                                className="btn"
                                onClick={() => onClick(accepted, user)}
                            >
                                Unfriend
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn"
                                    onClick={() => onClick(accepted, user)}
                                >
                                    Accept Request
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => onRejectClick(user)}
                                >
                                    Reject Request
                                </button>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <ul style={{ display: "flex", justifyContent: "center" }}>
            {users.map(({ user }) => (
                <li key={user.id}>
                    <ProfilePicture
                        firstName={user.first_name}
                        lastName={user.last_name}
                        profilePicURL={user.profile_url}
                    />
                    <div className="content" style={{ gridColumnStart: "2" }}>
                        <Link to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>

                        <button
                            className="btn"
                            onClick={() => onCancelClick(user)}
                        >
                            Cancel Request
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
