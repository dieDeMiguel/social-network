import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
        if (searchTerm.length <= 2) {
            return;
        }
        axios
            .get("/users/search", {
                params: {
                    q: searchTerm,
                },
            })
            .then((response) => {
                setSearchResults(response.data);
            });
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
                            <Link to={"/user/" + user.id}>
                                {user.firstName} {user.lastName}
                            </Link>
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
                            <Link to={"/user/" + user.id}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
