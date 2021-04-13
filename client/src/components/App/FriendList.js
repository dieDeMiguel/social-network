import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function FriendList({ users, onClick }) {
    return (
        <ul>
            {users.map(({ accepted, user }) => (
                <li key={user.id}>
                    <ProfilePicture
                        firstName={user.firstName}
                        lastName={user.lastName}
                        profilePicURL={user.profilePicURL}
                    />
                    <div className="content">
                        <Link to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                        <button
                            className="action mini"
                            onClick={() => onClick(accepted, user)}
                        >
                            {accepted ? "Unfriend" : "Accept Request"}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
