// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from './AuthProvider'; // Periksa pathnya
// import { supabase } from "../../client";

// export default function Nav() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null);
//     const profileIconRef = useRef(null);
//     const { user, logout } = useAuth(); // Get the user from the auth context
//     const [userData, setUserData] = useState({
//         name: "",
//         phoneNumber: "",
//         email: "",
//         address: "",
//         profilePicture: ""
//     });

//     useEffect(() => {
//         console.log("User ID:", user?.id); // Debug: Check user ID

//         const fetchUserData = async () => {
//             if (user && user.id) {
//                 try {
//                     // Fetch user data for the specific user
//                     const { data, error, count } = await supabase
//                         .from('users')
//                         .select('*', { count: 'exact' })
//                         .eq('id', user.id) // Menggunakan ID sebagai filter
//                         .limit(1); // Ensure we only fetch one record

//                     if (error) {
//                         console.error("Error fetching user data:", error.message);
//                         return;
//                     }

//                     // If there is no user found, log it for debugging
//                     if (count === 0) {
//                         console.error("No user found with the given ID:", user.id);
//                         return;
//                     }

//                     console.log("Data:", data);  // Debug: Check the data

//                     if (data && data.length > 0) {
//                         const [userRecord] = data; // Destructure the first user record
//                         setUserData({
//                             name: userRecord.name || "",
//                             phoneNumber: userRecord.phone_number || "",
//                             email: userRecord.email || "",
//                             address: userRecord.address || "",
//                             profilePicture: userRecord.profile_picture || ""
//                         });
//                     }
//                 } catch (err) {
//                     console.error("Error fetching user data:", err);
//                 }
//             } else {
//                 console.error("Invalid user ID:", user?.id);
//             }
//         };

//         fetchUserData();
//     }, [user]);


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

//     const handleLogout = async () => {
//         try {
//             await logout();
//             navigate("/");

//         } catch (error) {
//             console.error('Failed to logout:', error);
//         }
//     };

//     // Fungsi untuk memformat nama
//     const formatName = (name) => {
//         if (!name) return ''; // Jika nama tidak ada, kembalikan string kosong

//         // Cek apakah panjang nama lebih dari 22 karakter
//         if (name.length > 22) {
//             // Ambil 22 karakter pertama dan tambahkan ...
//             return `${name.substring(0, 22)}...`;
//         }

//         // Kembalikan nama jika panjangnya kurang dari atau sama dengan 22
//         return name;
//     };

//     // Fungsi untuk memformat email
//     const formatEmail = (email) => {
//         if (!email) return ''; // Jika email tidak ada, kembalikan string kosong

//         // Pisahkan nama pengguna dan domain
//         const [username, domain] = email.split('@');

//         if (username.length > 32) {
//             // Ambil 15 karakter pertama dari nama pengguna dan tambahkan ...@domain
//             return `${username.substring(0, 10)}...@${domain}`;
//         }

//         // Kembalikan email jika panjang username kurang dari atau sama dengan 32
//         return email;
//     };

//     let profilePicture;

//     if (userData.profilePicture) {
//         profilePicture = userData.profilePicture;
//     } else {
//         profilePicture = '/images/user.png';
//     }


//     const activeLink = 'block underline underline-offset-8 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:p-0';
//     const nonActiveLink = 'block text-white py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:font-black md:hover:text-white md:p-0';

//     return (
//         <><div className="mb-20">
//             <nav className="fixed py-1 px-24 top-0 left-0 z-50 bg-utama w-full justify-between overflow-x-hidden">
//                 <div className=" flex flex-wrap items-center justify-between mx-auto p-4 overflow-x-hidden">
//                     <a onClick={() => navigate("/")}
//                         className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
//                         <span className="self-center text-2xl font-bold whitespace-nowrap">lookasee</span>
//                     </a>

//                     <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//                         <ul className="flex flex-col gap-x-1 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-utama">
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

//                     <div className="flex md:order-2 items-center space-x-4 ">

//                         <button
//                             id="dropdownDefaultButton"
//                             className="inline-flex items-center  text-white rounded-lg active w-full dark:bg-blue-600"
//                             type="button"
//                             onClick={handleDropdownToggle}
//                             ref={profileIconRef}
//                         >
//                             <img className="w-10 h-10 overflow-hidden rounded-full object-cover" src={profilePicture} alt="" />
//                         </button>
//                         {dropdownOpen && (
//                             <div
//                                 ref={dropdownRef}
//                                 id="dropdown"
//                                 className="fixed top-10 right-28 mt-6 z-50 bg-white divide-y divide-gray-400 rounded-lg shadow w-64 dark:bg-gray-700"
//                             >
//                                 <div className="flex " >
//                                     <div className='m-2 '>
//                                         <img className="w-9 h-9 overflow-hidden rounded-full object-cover" src={profilePicture} alt="" />
//                                     </div>
//                                     <div className='my-2 mr-4 text-sm overflow-hidden'>
//                                         <p>{formatName(userData.name)}</p>
//                                         <p>{formatEmail(userData.email)}</p>
//                                     </div>
//                                 </div>
//                                 <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                                     <li className=''>
//                                         <a onClick={() => navigate("/profile")}
//                                             className="flex cursor-pointer inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                             <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                                                 <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
//                                             </svg> Profil
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a onClick={() => navigate("/changepassword")} className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                             <svg className=" w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                                                 <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
//                                             </svg>Ubah Sandi
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a onClick={() => navigate("/condition")} className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                             <svg className=" w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                                                 <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd" />
//                                             </svg>Privasi dan Kondisi
//                                         </a>
//                                     </li>
//                                 </ul>
//                                 <div onClick={handleLogout} className="py-2 hover:bg-gray-100 hover:rounded-b-lg">
//                                     <button className="flex block px-4 py-2 text-sm text-gray-700  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
//                                         <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
//                                         </svg>
//                                         Keluar</button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </nav>
//         </div>
//         </>
//     );
// }





















// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider'; // Periksa pathnya
// import { supabase } from "../../client";

// const Drawer = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const drawerRef = useRef(null);
//     const navigate = useNavigate();
//     const profileIconRef = useRef(null);
//     const { user, logout } = useAuth();
//     const [userData, setUserData] = useState({
//         name: "",
//         phoneNumber: "",
//         email: "",
//         address: "",
//         profilePicture: ""
//     });

//     const toggleDrawer = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleClickOutside = (event) => {
//         if (drawerRef.current && !drawerRef.current.contains(event.target) && profileIconRef.current && !profileIconRef.current.contains(event.target)) {
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (user && user.id) {
//                 try {
//                     const { data, error } = await supabase
//                         .from('users')
//                         .select('*')
//                         .eq('id', user.id)
//                         .single(); // Fetch single record

//                     if (error) {
//                         console.error("Error fetching user data:", error.message);
//                         return;
//                     }

//                     if (data) {
//                         setUserData({
//                             name: data.name || "",
//                             phoneNumber: data.phone_number || "",
//                             email: data.email || "",
//                             address: data.address || "",
//                             profilePicture: data.profile_picture || ""
//                         });
//                     }
//                 } catch (err) {
//                     console.error("Error fetching user data:", err);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [user]);

//     const handleLogout = async () => {
//         try {
//             await logout();
//             navigate("/");
//         } catch (error) {
//             console.error('Failed to logout:', error);
//         }
//     };

//     // Fungsi untuk memformat nama
//     const formatName = (name) => {
//         if (!name) return '';
//         return name.length > 22 ? `${name.substring(0, 22)}...` : name;
//     };

//     // Fungsi untuk memformat email
//     const formatEmail = (email) => {
//         if (!email) return '';
//         const [username, domain] = email.split('@');
//         return username.length > 32 ? `${username.substring(0, 10)}...@${domain}` : email;
//     };

//     const profilePicture = userData.profilePicture || '/images/user.png';

//     return (
//         <div className="relative">
//             {/* Tombol Ikon untuk membuka drawer */}
//             {!isOpen && (
//                 <button
//                     onClick={toggleDrawer}
//                     className="p-2 text-white bg-blue-500 rounded-lg fixed top-4 left-4 z-50"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M4 6h16M4 12h16M4 18h16"
//                         />
//                     </svg>
//                 </button>
//             )}

//             {/* Drawer */}
//             <div
//                 className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
//                 ref={drawerRef}
//             >
//                 <div className="relative p-4">
//                     {/* Tombol Tutup di pojok kanan atas drawer */}
//                     <button
//                         onClick={toggleDrawer}
//                         className="absolute top-4 right-4 text-white"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-6 h-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M6 18L18 6M6 6l12 12"
//                             />
//                         </svg>
//                     </button>

//                     <h2 className="text-xl font-bold">Menu</h2>
//                     <ul className="mt-4">
//                         <li>
//                             <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/'>Beranda</NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/search'>Pencarian</NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/upload'>Unggah</NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/riwayat'>Riwayat</NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/message'>Pesan</NavLink>
//                         </li>
//                         <button onClick={handleLogout} className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-6 h-6 mr-2"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
//                                 />
//                             </svg>
//                             Keluar
//                         </button>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Drawer;



























import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Periksa pathnya
import { supabase } from "../../client";

const Nav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const profileIconRef = useRef(null);
    const drawerRef = useRef(null);
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        profilePicture: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.id) {
                try {
                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (error) {
                        console.error("Error fetching user data:", error.message);
                        return;
                    }

                    if (data) {
                        setUserData({
                            name: data.name || "",
                            phoneNumber: data.phone_number || "",
                            email: data.email || "",
                            address: data.address || "",
                            profilePicture: data.profile_picture || ""
                        });
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleDropdownToggle = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            profileIconRef.current &&
            !profileIconRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }

        if (
            drawerRef.current &&
            !drawerRef.current.contains(event.target)
        ) {
            setDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const formatName = (name) => {
        if (!name) return '';
        return name.length > 22 ? `${name.substring(0, 22)}...` : name;
    };

    const formatEmail = (email) => {
        if (!email) return '';
        const [username, domain] = email.split('@');
        return username.length > 32 ? `${username.substring(0, 10)}...@${domain}` : email;
    };

    const profilePicture = userData.profilePicture || '/images/user.png';

    const activeLink = 'block underline underline-offset-8 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:p-0';
    const nonActiveLink = 'block text-white py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:font-black md:hover:text-white md:p-0';


    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-utama z-50">
                <div className="flex mx-0 sm:mx-20 justify-between items-center p-4">
                    <a onClick={() => navigate("/")} className="text-2xl font-bold cursor-pointer">lookasee</a>

                    <div className="hidden items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col gap-x-1 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-utama">
                        <li>
                                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/'>Beranda</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/search'>Pencarian</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/upload'>Unggah</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/riwayat'>Riwayat</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='/message'>Pesan</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Desktop Menu */}

                    <div className="hidden sm:block  flex md:order-2 items-center space-x-4 ">

                        <button
                            id="dropdownDefaultButton"
                            className="inline-flex items-center  text-white rounded-lg active w-full dark:bg-blue-600"
                            type="button"
                            onClick={handleDropdownToggle}
                            ref={profileIconRef}
                        >
                            <img className="w-10 h-10 overflow-hidden rounded-full object-cover" src={profilePicture} alt="" />
                        </button>
                        {dropdownOpen && (
                            <div
                                ref={dropdownRef}
                                id="dropdown"
                                className="fixed top-10 right-28 mt-6 z-50 bg-white divide-y divide-gray-400 rounded-lg shadow w-64 dark:bg-gray-700"
                            >
                                <div className="flex " >
                                    <div className='m-2 '>
                                        <img className="w-9 h-9 overflow-hidden rounded-full object-cover" src={profilePicture} alt="" />
                                    </div>
                                    <div className='my-2 mr-4 text-sm overflow-hidden'>
                                        <p>{formatName(userData.name)}</p>
                                        <p>{formatEmail(userData.email)}</p>
                                    </div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li className=''>
                                        <a onClick={() => navigate("/profile")}
                                            className="flex cursor-pointer inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                                            </svg> Profil
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => navigate("/changepassword")} className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg className=" w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                            </svg>Ubah Sandi
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => navigate("/condition")} className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg className=" w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd" />
                                            </svg>Privasi dan Kondisi
                                        </a>
                                    </li>
                                </ul>
                                <div onClick={handleLogout} className="py-2 hover:bg-gray-100 hover:rounded-b-lg">
                                    <button className="flex block px-4 py-2 text-sm text-gray-700  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                        </svg>
                                        Keluar</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <button onClick={handleDrawerToggle} className="md:hidden p-2 text-white bg-blue-500 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Drawer */}
                    {drawerOpen && (
                        <div ref={drawerRef} className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform translate-x-0 z-40">
                            <button onClick={handleDrawerToggle} className="absolute top-4 right-4 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="p-4">
                            <h2 className="text-xl font-bold">Menu</h2>
                    <ul className="mt-4">
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/'>Beranda</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/profile'>Profil</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/search'>Pencarian</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/upload'>Unggah</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/riwayat'>Riwayat</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='/message'>Pesan</NavLink>
                        </li>
                        <button onClick={handleLogout} className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                                />
                            </svg>
                            Keluar
                        </button>
                    </ul>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
