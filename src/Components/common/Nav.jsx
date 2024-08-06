// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';



// export default function Nav() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const profileIconRef = useRef(null);

//     const navigate = useNavigate();

//     const handleDropdownToggle = () => {
//         setDropdownOpen((prev) => !prev);
//     };

//     const handleClickOutside = (event) => {
//         if (
//             dropdownRef.current &&
//             !dropdownRef.current.contains(event.target) &&
//             profileIconRef.current &&
//             !profileIconRef.current.contains(event.target)
//         ) {
//             setDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const activeLink = 'block underline underline-offset-8 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:p-0';
//     const nonActiveLink = 'block text-white py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:font-black md:hover:text-white md:p-0';

//     return (
//         <div className="pt-20">
//             <nav className="py-1.5 fixed top-0 left-0 z-50 bg-utama w-full">
//                 <div className="px-24 flex items-center justify-between mx-auto p-4">
//                     <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
//                         <span className="self-center text-2xl font-bold whitespace-nowrap">lookasee</span>
//                     </a>

//                     <div className="hidden md:flex items-center justify-between w-auto space-x-8">
//                         <ul className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-0 mt-4 md:mt-0 font-medium bg-gray-50 md:bg-utama rounded-lg md:rounded-none border border-gray-100 md:border-0">
//                             <li>
//                                 <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/'>Beranda</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/search'>Pencarian</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/upload'>Unggah</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/riwayat'>Riwayat</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/message'>Pesan</NavLink>
//                             </li>
//                         </ul>
//                     </div>

//                     <div className="flex items-center space-x-4">
//                         <button onClick={() => navigate("/login")} className="flex items-center bg-utama text-white font-normal rounded-full text-sm px-5 py-2">
//                             <svg className="w-4 h-4 text-putih dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
//                             </svg>
//                             <p className="p-2">Login</p>
//                         </button>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }







// Drawer.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed top-4 left-4 z-50 p-2 text-white bg-blue-600 rounded-md md:hidden"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4 p-2 text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="mt-12 px-4">
          <li>
           
          </li>
          <li>
            <NavLink
              to="/riwayat"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Riwayat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/message"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Pesan
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Drawer;
