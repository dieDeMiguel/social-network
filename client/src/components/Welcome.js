import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import { HashRouter, Route, Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function Welcome() {
    function onSuccess() {
        window.location.href = "/";
    }

    return (
        <section className="welcome">
            <HashRouter>
                <Route exact path="/">
                    <header>
                        <span className="logo">
                            <Link to="/">
                                <img src="/logo.jpeg"></img>
                            </Link>
                        </span>
                        <ProfilePicture
                            firstName=""
                            lastName=""
                            profilePicURL=""
                        />
                    </header>
                    <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
                    <div className="padding-welcome"></div>
                    <footer>
                        <p>
                            Already registered? <Link to="/login">Login</Link>
                            <br></br>
                            Forgot your password?
                            <Link to="/password-reset"> Password reset</Link>
                        </p>
                    </footer>
                </Route>

                <Route path="/login">
                    <header>
                        <span className="logo">
                            <Link to="/">
                                <img src="/logo.jpeg"></img>
                            </Link>
                        </span>
                        <ProfilePicture
                            firstName=""
                            lastName=""
                            profilePicURL=""
                        />
                    </header>
                    <LoginForm onSuccess={onSuccess}></LoginForm>
                    <footer>
                        <p>
                            New here? <Link to="/">Register</Link>
                            <br></br>
                            Forgot your password?
                            <Link to="/password-reset"> Password reset</Link>
                        </p>
                    </footer>
                </Route>

                <Route path="/password-reset">
                    <header>
                        <span className="logo">
                            <a href="/">
                                <img src="/logo.jpeg"></img>
                            </a>
                        </span>
                        <ProfilePicture
                            firstName=""
                            lastName=""
                            profilePicURL=""
                            onClick=""
                        />
                    </header>
                    <ResetPassword></ResetPassword>
                    <footer>
                        <p>
                            New here? <Link to="/">Register</Link>
                        </p>
                    </footer>
                </Route>
            </HashRouter>
        </section>
    );
}
