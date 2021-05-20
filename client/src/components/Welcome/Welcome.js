import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import Header from "../Partials/Header";
import { HashRouter, Route, Link } from "react-router-dom";
import Footer from "../Partials/Footer";
import ProfilePicture from "../App/ProfilePicture";
import Nav from "../App/Nav";

export default function Welcome() {
    function onSuccess() {
        window.location.href = "/";
    }

    return (
        <section className="welcome has-background-warning-light ">
            <HashRouter>
                <Header />

                <Route exact path="/">
                    <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
                    <div className="padding-welcome"></div>
                    <Footer />
                </Route>

                <Route path="/login">
                    <LoginForm onSuccess={onSuccess}></LoginForm>
                    <Footer />
                </Route>

                <Route path="/password-reset">
                    <ResetPassword></ResetPassword>
                    <Footer />
                </Route>
            </HashRouter>
        </section>
    );
}
