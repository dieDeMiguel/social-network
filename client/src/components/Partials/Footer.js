import { Link } from "react-router-dom";

function Footer({ user, onLogOut }) {
    return (
        <>
            <footer className="page-footer teal lighten-2">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Super Hero</h5>
                            <p className="grey-text text-lighten-4">
                                {user ? (
                                    <form onSubmit={() => onLogOut()}>
                                        <button
                                            type="submit"
                                            classNameName="btn-logout"
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
                            </p>
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
