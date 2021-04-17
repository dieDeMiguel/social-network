export default function ChatMessage({ firstName, lastName, message }) {
    return (
        <li>
            {firstName} {lastName} {message}
        </li>
    );
}
