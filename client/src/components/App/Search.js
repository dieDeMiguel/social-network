import { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
        <div className="flex flex-col">
            <div>
                <form
                    onChange={onChange}
                    className="flex border border-black rounded-lg mt-12 ml-6"
                >
                    <input
                        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-xs p-4"
                        placeholder="Search other users..."
                    />
                    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">
                        Search
                    </button>
                </form>
            </div>
            <div>
                <div className="container mb-2 flex mx-auto w-full items-center justify-center">
                    <ul className="flex flex-col p-4">
                        {searchResults.map((user) => (
                            <li
                                className="border-gray-400 flex flex-row"
                                key={user.id}
                            >
                                <div className="select-none mb-4 flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 hover:shadow-2xl border-green-400">
                                    <div className="flex-1 pl-1">
                                        <div className="font-medium">
                                            <p
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                }}
                                            >
                                                <Link to={"/user/" + user.id}>
                                                    <img
                                                        className="profile-picture"
                                                        src={user.profile_url}
                                                        style={{
                                                            borderRadius: "5px",
                                                            objectFit: "cover",
                                                            width: "100px",
                                                            height: "100px",
                                                        }}
                                                    />
                                                </Link>
                                            </p>
                                            <p>
                                                {user.firstName} {user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
