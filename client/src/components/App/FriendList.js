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
        <ul>
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
                                className="action mini"
                                onClick={() => onClick(accepted, user)}
                            >
                                Unfriend
                            </button>
                        ) : (
                            <>
                                <button
                                    className="action mini"
                                    onClick={() => onClick(accepted, user)}
                                >
                                    Accept Request
                                </button>
                                <button
                                    className="action mini"
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
        <ul>
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

                        <button
                            className="action mini"
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
