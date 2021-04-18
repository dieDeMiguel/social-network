import { BrowserRouter, Route, Link } from "react-router-dom";

export default function ChatMessage({
    firstName,
    lastName,
    message,
    created_at,
}) {
    return (
        <li>
            {firstName} {lastName} {message} {created_at}
        </li>
    );
}
