import axios from "axios";

const instance = axios.create({
    xsrfCookieName: "social-network-token",
    xsrfHeaderName: "csrf-token",
});

export default instance;
