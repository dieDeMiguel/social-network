import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import App from "./components/App";

if (window.location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<App />, document.querySelector("main"));
}
