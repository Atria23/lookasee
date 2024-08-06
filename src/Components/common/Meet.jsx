import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Meet() {
    const navigate = useNavigate();

    function validateForm() {
        var address = document.getElementById('address').value;
        var time = document.getElementById('time').value;
        var date = document.getElementById('date').value;
        var phoneNumber = document.getElementById('phone-number').value;

        if (address !== "" && time != "" && date !== "" && phoneNumber !== "") {
            navigate("/message")
        } else {
            alert('INPUT ALL THE DATA!')
        }
    }

    function BackMessage() {
        navigate("/message")
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div id="meeting" className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="mb-4 text-sm">
                    <h2 className="text-gray-600 mb-2">Meeting Location
                        <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Type your name" />
                    </h2>
                    <p className="text-gray-600 mb-2">Time
                        <input type="time" id="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter your new email" />
                    </p>
                    <p className="text-gray-600 mb-2">Date
                        <input type="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter your new phone number " />
                    </p>
                    <p className="text-gray-600 mb-2">Phone Number
                        <input type="number" id="phone-number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter your new address" />
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        onClick={validateForm}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                        onClick={BackMessage}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
