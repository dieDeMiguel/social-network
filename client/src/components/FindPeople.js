import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import USERS_LIST from "../../social-network.json";

export default function FindPeople() {
    const [recentUsers, setSearchTerm] = useState([]);
    const [searchTerm, setSearchedUsers] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setSearchTerm(USERS_LIST);
    }, []);

    // // this useEffect runs every time searchTerm changes
    // useEffect(() => {
    //     // it would be great if you make the call just if searchTerm is longer than
    //     // a certain amount of chars - 3 is a nice number!
    //     // make the axios call to /users/search?q={searchTerm}
    //     // then setSearchResults to the response.data
    // }, [searchTerm]);

    function onChange(event) {
        // here you set searchTerm to the current value of the input field
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
                <ul>{/* see after for how to render a list of results */}</ul>
            </section>
        </section>
    );
}
