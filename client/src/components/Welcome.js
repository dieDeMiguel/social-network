import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import { HashRouter, Route, Link } from "react-router-dom";

export default function onSucces() {
    function onSuccess() {
        window.location.href = "/";
    }

    return (
        <section className="welcome">
            <HashRouter>
                <Route exact path="/">
                    <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
                    <footer>
                        <p>
                            Already registered? <Link to="/login">Login</Link>
                            <br></br>
                            Forgot your password?
                            <Link to="/password-reset">Password reset</Link>
                        </p>
                    </footer>
                </Route>

                <Route path="/login">
                    <LoginForm onSuccess={onSuccess}></LoginForm>
                    <footer>
                        <p>
                            New here? <Link to="/">Register</Link>
                        </p>
                    </footer>
                </Route>

                <Route path="/password-reset">
                    <ResetPassword></ResetPassword>
                    <footer>
                        <p>
                            Do you wanna go back? <Link to="/">Register</Link>
                        </p>
                    </footer>
                </Route>
            </HashRouter>
        </section>
    );
}
