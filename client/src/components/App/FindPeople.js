import axios from "../../axios";
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
        <div className="main-profile main-find">
            <section className="find-people">
                <section className="find-wrapper">
                    <h2>Find people</h2>
                    <h3>Who is new?</h3>
                    <ul className="find-list" id="list-item">
                        {recentUsers.map((user) => (
                            <li key={user.id}>
                                <Link to={"/user/" + user.id}>
                                    <div className="list-image">
                                        <p>
                                            <img
                                                className="profile-picture"
                                                src={
                                                    user.profile_url ||
                                                    "/avatar.png"
                                                }
                                            />
                                        </p>
                                        <p>
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="search">
                    <h3>Looking for someone in particular?</h3>
                    <p>
                        <input
                            type="text"
                            placeholder="Type some text"
                            onChange={onChange}
                        />
                    </p>
                    <ul className="find-list" id="list-item">
                        {searchResults.map((user) => (
                            <li key={user.id}>
                                <Link to={"/user/" + user.id}>
                                    <div className="list-image">
                                        <p>
                                            <img
                                                className="profile-picture"
                                                src={user.profile_url}
                                            />
                                        </p>
                                        <p>
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
}
