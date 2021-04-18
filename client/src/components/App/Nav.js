import axios from "../../axios";
import { Link } from "react-router-dom";

export default function Navigation({ isLogged }) {
    return (
        <>
            {isLogged ? (
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/friends">Friends</Link>
                        </li>
                        <li>
                            <Link to="/users">Find People</Link>
                        </li>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}
