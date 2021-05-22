import { Link } from "react-router-dom";

function Footer({ user, onLogOut }) {
    return (
        <>
            <footer className="page-footer teal lighten-2">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Super Hero</h5>
                            {user ? (
                                <form onSubmit={() => onLogOut()}>
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
