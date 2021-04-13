import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function FriendList({ users, onClick }) {
    console.log("dentro de FriendList", users);
    return (
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
