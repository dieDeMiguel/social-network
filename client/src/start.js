import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/Welcome";
import App from "./components/App/App";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const store = createStore(reducer, applyMiddleware(reduxPromise));

if (window.location.pathname === "/welcome") {
    let elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
    ReactDOM.render(elem, document.querySelector("main"));
} else {
    let elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    ReactDOM.render(elem, document.querySelector("main"));
}
