import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";

if (window.location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<p>Profile</p>, document.querySelector("main"));
}
