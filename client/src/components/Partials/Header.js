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
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img
                            src="https://bulma.io/images/bulma-logo.png"
                            width="112"
                            height="28"
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
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div
                    id="navbarBasicExample"
                    className={
                        isActive ? "navbar-menu is-active" : "navbar-menu"
                    }
                >
                    <div className="navbar-start">
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

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">More</a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">About</a>
                                <a className="navbar-item">Jobs</a>
                                <a className="navbar-item">Contact</a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item">Report an issue</a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
