import RegistrationForm from "./RegistrationForm";

export default function onSucces() {
    function onSuccess() {
        window.location.href = "/";
    }

    return (
        <section className="welcome">
            <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
        </section>
    );
}
