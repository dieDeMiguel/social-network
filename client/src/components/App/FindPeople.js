import axios from "../../axios";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useState, useEffect } from "react";

export default function FindPeople() {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        axios.get("/users/most-recent").then((response) => {
            setRecentUsers(response.data);
        });
    }, []);

    return (
        <>
            <div
                className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden items-start friends-list"
                style={{ alignItems: "flex-start", padding: "5%" }}
            >
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-green-300 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        First Name
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Last Name
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Avatar
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Visit Profile
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {recentUsers.map((user) => (
                                    <tr
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                        key={user.id}
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap text-center align-middle">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                        src={"/logo.jpeg"}
                                                    />
                                                </div>
                                                <span className="font-medium ml-2">
                                                    {user.firstName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6  text-center align-middle">
                                            <div className="flex items-center">
                                                <span>{user.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center align-middle">
                                            <div className="flex items-center justify-center">
                                                <img
                                                    className="w-12 h-12 rounded-full border-gray-200 border transform hover:scale-125 object-cover"
                                                    src={
                                                        user.profile_url ||
                                                        "/avatar.png"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center align-middle">
                                            <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center align-middle">
                                            <div className="flex item-center justify-center">
                                                <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <Link
                                                        to={"/user/" + user.id}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Search />
            </div>
        </>
    );
}
