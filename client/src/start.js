import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/Welcome";
import App from "./components/App/App";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const store = createStore(reducer, applyMiddleware(reduxPromise));

let elem;
if (window.location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}
ReactDOM.render(
    <Provider store={store}>{elem}</Provider>,
    document.querySelector("main")
);
