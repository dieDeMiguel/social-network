import { Link } from "react-router-dom";
import axios from "../../axios";

function Footer({ user }) {
    function onlogOut(event) {
        event.preventDefault();
        axios.post("/logout").then((response) => {
            console.log("[App]:", response.data.message);
            window.location.href = "/welcome";
        });
    }

    return (
        <>
            <footer
                className="page-footer teal lighten-2"
                style={{
                    backgroundColor: "rgba(120, 53, 15, var(--tw-bg-opacity))",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Super Hero</h5>
                            {user ? (
                                <form onSubmit={onlogOut}>
                                    <button
                                        type="submit"
                                        className="btn-logout"
                                    >
                                        Logout
                                    </button>
                                </form>
                            ) : (
                                <>
                                    New here? <Link to="/">Register</Link>
                                    <br></br>
                                    Forgot your password?
                                    <Link to="/password-reset">
                                        {" "}
                                        Password reset
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="footer-copyright center-align">
                    <div className="container">© 2021 dieDeM</div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
