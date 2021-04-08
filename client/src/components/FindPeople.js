import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import USERS_LIST from "../../social-network.json";

export default function FindPeople() {
    const [recentUsers, setRecentUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get("/users/most-recent").then((response) => {
            setRecentUsers(response.data);
        });
    }, []);

    useEffect(() => {
        console.log("searchTerm.length", searchTerm.length);
        if (searchTerm.length <= 2) {
            return;
        }
        axios
            .get("/users/search", {
                params: {
                    q: searchTerm,
                },
            })
            .then((results) => console.log("results", results));
    }, [searchTerm]);

    function onChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <section className="find-people">
            <h2>Find people</h2>
            <section>
                <h3>Who is new?</h3>
                <ul>
                    {recentUsers.map((user) => (
                        <li key={user.id}>
                            {user.first_name} {user.last_name}
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h3>Looking for someone in particular?</h3>
                <p>
                    <input
                        type="text"
                        placeholder="Type some text"
                        onChange={onChange}
                    />
                </p>
                <ul>
                    {searchResults.map((user) => (
                        <li key={user.id}>
                            {user.first_name} {user.last_name}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
