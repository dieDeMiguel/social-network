import axios from "../../axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../store/actions";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Navigation() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

    useEffect(() => dispatch(getLoggedUser()), []);

    console.log("[Dentro de Nav.js] user", user);

    const isLogged = user;
    return (
        <>
            {user ? (
                <nav>
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
                            <Link to="/login">/login</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}
