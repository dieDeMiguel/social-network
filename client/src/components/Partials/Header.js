import { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Header({ user }) {
    const [isActive, setIsActive] = useState(false);

    function onBurgerClick() {
        setIsActive(!isActive);
    }

    return (
        <>
            <nav
                className="navbar px-12"
                role="navigation"
                aria-label="main navigation"
                style={{ minHeight: "6.25rem" }}
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img
                            src="/logo.jpeg"
                            width="112"
                            height="28"
                            style={{
                                maxWidth: "5rem",
                                maxHeight: "5rem",
                                borderRadius: "50%",
                            }}
                            className="shadow-xl"
                        />
                    </a>

                    <a
                        onClick={onBurgerClick}
                        role="button"
                        className={
                            isActive
                                ? "navbar-burger is-active"
                                : "navbar-burger"
                        }
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        style={{ alignSelf: "center" }}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div
                    id="navbarBasicExample"
                    className={
                        isActive
                            ? "navbar-menu is-active"
                            : "navbar-menu is-justify-content-flex-end"
                    }
                >
                    <div className="navbar-start mr-3">
                        {user ? (
                            <>
                                <Link to="/" className="navbar-item">
                                    Profile
                                </Link>

                                <Link to="/users" className="navbar-item">
                                    Find People
                                </Link>

                                <Link to="/friends" className="navbar-item">
                                    Your Friends
                                </Link>

                                {/* <Link to="/caht" className="navbar-item">
                                    Chat
                                </Link> */}
                            </>
                        ) : (
                            <>
                                <Link to="/" className="navbar-item">
                                    Register
                                </Link>

                                <Link to="/login" className="navbar-item">
                                    Login
                                </Link>

                                <Link
                                    to="/password-reset"
                                    className="navbar-item"
                                >
                                    Reset Password
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
