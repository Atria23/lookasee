import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleDrawer }) => {
    const navigate = useNavigate();

    function handleBack() {
        navigate("/");
    }

    return (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">

            <span className="font-semibold hidden lg:block text-lg ">Chat</span>


            {/* Tombol untuk membuka drawer */}
            <button
                onClick={toggleDrawer}
                className="lg:hidden flex items-center space-x-2 p-3 text-white rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                {/* Ikon SVG */}
                <svg className="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>

            </button>


            {/* Tombol untuk kembali */}
            <button onClick={handleBack} className="text-gray-400 hover:text-white ml-auto">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                </svg>
            </button>
        </div>
    );
};

export default Navbar;
