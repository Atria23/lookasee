import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { useAuth } from "../common/AuthProvider";
import { supabase } from "../../client";

export default function ProfileNav({ onLogout }) {
  const { user } = useAuth(); // Ambil user dari context auth
  const [profilePicture, setProfilePicture] = useState('/images/user.png'); // Default picture

  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    profilePicture: ""
  });

  useEffect(() => {
    console.log("User object:", user); // Log user object to ensure it's valid
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id) { // Ensure user and user.id are available
        try {
          const { data, error, count } = await supabase
            .from('users')
            .select('*', { count: 'exact' })
            .eq('id', user.id) // Use ID as filter
            .limit(1); // Ensure we only fetch one record 

          if (error) {
            console.error("Error fetching user data:", error.message);
            return;
          }

          if (count === 0) {
            console.error("No user found with the given ID:", user.id);
            return;
          }

          if (data && data.length > 0) {
            const [userRecord] = data; // Destructure the first user record
            setUserData({
              name: userRecord.name || "",
              phoneNumber: userRecord.phone_number || "",
              email: userRecord.email || "",
              address: userRecord.address || "",
              profilePicture: userRecord.profile_picture || ""
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        console.error("Invalid user ID:", user?.id);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.id) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('profile_picture')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error fetching profile picture:", error.message);
            return;
          }

          if (data && data.profile_picture) {
            setProfilePicture(data.profile_picture);
          }
        } catch (err) {
          console.error("Error fetching profile picture:", err.message);
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row rounded-lg shadow-lg h-full w-full md:w-1/4 p-4">
      <div className="rounded-lg h-full bg-white flex flex-col w-full"> 
        <div className="flex flex-col items-center bg-blue-100 flex-shrink-0 p-4 md:p-2">
          <img
            className="w-20 h-20 mt-2 object-cover rounded-full border-4 border-gray-300 mb-2"
            src={profilePicture}
            alt="Profile"
          />
          <h2 className="text-lg font-semibold mb-2 text-center">{userData.name}</h2>
        </div>
        <nav className="mt-8 px-2 flex-grow overflow-auto"> 
          <ul>
            <li className="mb-4">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-700 rounded-lg ${isActive ? 'border-l-2 border-blue-500 bg-blue-100' : ''} hover:bg-blue-100`
                }
              >
                <svg className="w-6 h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                </svg>

                Profil
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/changepassword"
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-700 rounded-lg ${isActive ? 'border-l-2 border-blue-500 bg-blue-100' : ''} hover:bg-blue-100`
                }
              >
                <svg className="w-6 h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                </svg>

                Atur Sandi
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/condition"
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-700 rounded-lg ${isActive ? 'border-l-2 border-blue-500 bg-blue-100' : ''} hover:bg-blue-100`
                }
              >
                <svg className="w-6 h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd" />
                </svg>

                Privasi dan Keamanan
              </NavLink>
            </li>
            <li>
              <a
                onClick={onLogout}
                className="cursor-pointer flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-lg"
              >
                <svg className="w-6 h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                </svg>

                Keluar
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
