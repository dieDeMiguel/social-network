import RegistrationForm from "./RegistrationForm";

export default function Welcome() {
    function onSuccess() {
        alert("Registered!");
    }

    return (
        <section className="welcome">
            // title // an image perhaps
            <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
            // footer with link to /login
        </section>
    );
}
