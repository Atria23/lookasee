import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    function handleBack() {
        navigate("/");
    }

    return (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <span className="font-semibold text-lg text-utama">Chat</span>
            <button onClick={handleBack} className="text-gray-400 hover:text-white ml-auto">
                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                </svg>
                

            </button>

            <div></div> {/* Placeholder for spacing */}
        </div>
    );
};

export default Navbar;
