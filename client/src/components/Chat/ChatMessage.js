import { BrowserRouter, Route, Link } from "react-router-dom";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
}

export default function ChatMessage({
    user_id,
    profilePicURL,
    firstName,
    lastName,
    message,
    created_at,
}) {
    return (
        <li className="message">
            <Link className="message-image" to={`/user/${user_id}`}>
                <img src={profilePicURL} />
            </Link>
            <div className="message-conten">
                <p className="message-info">
                    <Link to={`/user/${user_id}`}>
                        {firstName} {lastName}
                    </Link>
                    <span className="message-date">
                        {formatDate(created_at)}
                    </span>
                </p>

                <p className="message-body">{message}</p>
            </div>
        </li>
    );
}
