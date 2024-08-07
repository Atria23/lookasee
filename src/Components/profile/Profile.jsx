// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../common/AuthProvider"; // Ensure this path is correct
// import { supabase } from "../../client";
// import ProfileNav from './ProfileNav'; // Impor komponen navigasi

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth(); // Get the user from the auth context
//   const [isEditing, setIsEditing] = useState(false);

//   const [userData, setUserData] = useState({
//     name: "",
//     phoneNumber: "",
//     email: "",
//     address: "",
//     profilePicture: ""
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user && user.id) {
//         try {
//           const { data, error, count } = await supabase
//             .from('users')
//             .select('*', { count: 'exact' })
//             .eq('id', user.id) // Use ID as filter
//             .limit(1); // Ensure we only fetch one record

//           if (error) {
//             console.error("Error fetching user data:", error.message);
//             return;
//           }

//           if (count === 0) {
//             console.error("No user found with the given ID:", user.id);
//             return;
//           }

//           if (data && data.length > 0) {
//             const [userRecord] = data; // Destructure the first user record
//             setUserData({
//               name: userRecord.name || "",
//               phoneNumber: userRecord.phone_number || "",
//               email: userRecord.email || "",
//               address: userRecord.address || "",
//               profilePicture: userRecord.profile_picture || ""
//             });
//           }
//         } catch (err) {
//           console.error("Error fetching user data:", err);
//         }
//       } else {
//         console.error("Invalid user ID:", user?.id);
//       }
//     };

//     fetchUserData();
//   }, [user]);

//   const handleEditProfile = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//   };

//   const handleSubmitEdit = async (updatedUserData) => {
//     // Implement your update logic here
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       const user = session?.user;

//       if (user) {
//         const { name, email, phoneNumber, address, profilePicture } = updatedUserData;

//         if (name && email && phoneNumber && address) {
//           const updatedUser = {
//             name,
//             email,
//             phone_number: phoneNumber,
//             address,
//             profile_picture: profilePicture
//           };

//           const { error } = await supabase
//             .from('users')
//             .upsert({ id: user.id, ...updatedUser }) && await supabase.auth.updateUser({
//               email: email,
//             })

//           if (error) {
//             console.error('Error updating profile:', error.message);
//             alert('Error updating profile');
//           } else {
//             setUserData(updatedUserData);
//             setIsEditing(false);
//           }
//         } else {
//           alert('Please fill all fields correctly!');
//         }
//       } else {
//         alert('User not logged in');
//       }
//     } catch (error) {
//       console.error('Error fetching user session:', error.message);
//       alert('Error fetching user session');
//     }
//   };

//   let profilePicture;

//   if (userData.profilePicture) {
//     profilePicture = userData.profilePicture;
//   } else {
//     profilePicture = '/images/user.png';
//   }


//   const handleLogout = async () => {
//     try {
//         await logout();
//         navigate('/'); // Navigasi ke halaman login setelah logout
//     } catch (error) {
//         console.error('Failed to logout:', error);
//     }
//   };

//   return (
//     <div className="flex h-full overflow-hidden">
//       <ProfileNav onLogout={handleLogout} />
//       <div className="flex-1 p-2">
//         {isEditing ? (
//           <EditProfileForm
//             userData={userData}
//             onCancel={handleCancelEdit}
//             onSubmit={handleSubmitEdit}
//           />
//         ) : (
//           <div className="flex ">
//             <div className="w-full  rounded-lg shadow-lg p-8">
//               <h1 className="text-2xl font-semibold mb-2 ">Profile</h1>
//               <div className="border border-black mb-8"></div>
//               <div className="flex flex-col lg:flex-row bg-blue-100 py-12 p-6 rounded-lg">
//                 <div className="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0 ">
//                   <img className="w-64 h-64 object-cover rounded-full border-4 ml-4 border-gray-300 " src={profilePicture} alt="Profile" />
//                 </div>
//                 <div className="lg:w-2/3 lg:pl-10">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-bold">Nama:</label>
//                     <p className="text-md">{userData.name}</p>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-bold">Email:</label>
//                     <p className="text-md">{userData.email}</p>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-bold">Telepon:</label>
//                     <p className="text-md">{userData.phoneNumber}</p>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-bold">Alamat:</label>
//                     <p className="text-md">{userData.address}</p>
//                   </div>
//                   <button
//                     onClick={handleEditProfile}
//                     className="border border-utama text-utama py-2 px-4 rounded-lg"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function EditProfileForm({ userData, onCancel, onSubmit }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(userData.profilePicture || '');
//   const [name, setName] = useState(userData.name);
//   const [email, setEmail] = useState(userData.email);
//   const [emailValid, setEmailValid] = useState(true);
//   const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
//   const [phoneNumberValid, setPhoneNumberValid] = useState(true);
//   const [address, setAddress] = useState(userData.address);

//   useEffect(() => {
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreviewUrl(userData.profilePicture || '');
//     }
//   }, [selectedFile]);

//   useEffect(() => {
//     const validateEmail = (email) => {
//       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return regex.test(email);
//     };
//     setEmailValid(validateEmail(email));
//   }, [email]);

//   useEffect(() => {
//     const phoneNumberValid = (phone) => {
//       // Basic regex for phone number validation
//       const regex = /^(\+?\d{1,4}[\s-]?)?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
//       return regex.test(phone);
//     };

//     setPhoneNumberValid(phoneNumberValid(phoneNumber));
//   }, [phoneNumber]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleSubmit = () => {
//     onSubmit({ name, email, phoneNumber, address, profilePicture: previewUrl });
//   };

//   return (
//     <div className=" overflow-hidden shadow-lg rounded-lg">
//         <div className=" p-4 bg-white-100  ">
//           <div className="pl-4">
//             <h1 className=" text-2xl font-semibold mb-2">Edit Profile</h1>
//             <div className="border border-black mb-8"></div>
//           </div>
//           <div className="flex flex-grow lg:flex-row bg-blue-100 ml-4 py-12 p-6 rounded-lg">
//               <div className="flex flex-col items-center ">
//                 <div className=" rounded-lg pl-4">
//                   <div className="bg-gray-300 ">
//                     <div className="w-64 h-64 relative">
//                       <label
//                         htmlFor="dropzone-file"
//                         className="h-full w-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex items-center justify-center"
//                       >
//                         {previewUrl ? (
//                           <div className="w-full h-full overflow-hidden rounded-full">
//                             <img
//                               src={previewUrl}
//                               alt="Preview"
//                               className="object-cover h-full w-full"
//                             />
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center">
//                             <svg
//                               className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 20 16"
//                             >
//                               <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                               />
//                             </svg>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">
//                               <span className="font-semibold">Pilih Gambar</span>
//                             </p>
//                           </div>
//                         )}
//                         <input
//                           id="dropzone-file"
//                           type="file"
//                           className="hidden"
//                           onChange={handleFileChange}
//                           accept="image/*"
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500">Ukuran gambar: maks. 1 MB</p>
//                 <p className="text-xs text-gray-500">Format gambar: JPEG, JPG, PNG</p>
//               </div>
//             <div className="w-2/3 pl-20">
//               <div className="mb-8 flex items-center">
//                 <label htmlFor="name" className="w-1/4 block text-gray-700 font-bold">Nama:</label>
//                 <input
//                   type="text"
//                   maxLength={30}
//                   id="name"
//                   className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
//                   required
//                   placeholder="Masukkan Nama Terbaru Anda"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="flex items-center">
//                 <label htmlFor="email" className="w-1/4 block text-gray-700 font-bold">Email:</label>
//                 <input
//                   type="email"
//                   maxLength={50}
//                   id="email"
//                   className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
//                   required
//                   placeholder="Masukkan Email Terbaru Anda"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="mb-8 flex items-center">
//                 <div className="w-1/4 text-gray-700"></div>
//                 {!emailValid && (
//                   <p className="text-red-500 text-sm w-full ml-2">Email tidak valid</p>
//                 )}
//               </div>
//               <div className="flex items-center">
//                 <label htmlFor="phone-number" className="w-1/4 block text-gray-700 font-bold">No. Telp:</label>
//                 <input
//                   type="number"
//                   id="phone-number"
//                   className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
//                   required
//                   placeholder="Masukkan Nomor Terbaru Anda"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                 />
//               </div>
//               <div className="mb-8 flex items-center">
//                 <div className="w-1/4 text-gray-700"></div>
//                 {!phoneNumberValid && (
//                   <p className="text-red-500 text-sm w-full ml-2">Nomor telepon tidak valid</p>
//                 )}
//               </div>
//               <div className="mb-8 flex items-center">
//                 <label htmlFor="address" className="w-1/4 block text-gray-700 font-bold">Alamat:</label>
//                 <input
//                   type="text"
//                   maxLength={400}
//                   id="address"
//                   className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
//                   required
//                   placeholder="Masukkan Alamat Terbaru Anda"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>
//               <div className=" flex justify-start space-x-4">
//                 <button
//                   className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
//                   onClick={handleSubmit}
//                   disabled={!emailValid || !phoneNumberValid}
//                 >
//                   Simpan
//                 </button>
//                 <button
//                   className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400"
//                   onClick={onCancel}
//                 >
//                   Batal
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//     </div>
//   );
// }































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../common/AuthProvider"; // Ensure this path is correct
import { supabase } from "../../client";
import ProfileNav from './ProfileNav'; // Impor komponen navigasi

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get the user from the auth context
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };



  const handleSubmitEdit = async (updatedUserData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { name, email, phoneNumber, address, profilePicture } = updatedUserData;

        if (name && email && phoneNumber && address) {
          const updatedUser = {
            name,
            email,
            phone_number: phoneNumber,
            address,
            profile_picture: profilePicture
          };

          // Update user profile in 'users' table
          const { error: usersError } = await supabase
            .from('users')
            .upsert({ id: user.id, ...updatedUser });

          if (usersError) {
            console.error('Error updating profile in users table:', usersError.message);
            alert('Error updating profile in users table');
            return;
          }

          // Update email in 'auth' table using SQL function
          const { error: sqlError } = await supabase.rpc('update_user_email', {
            user_id: user.id,
            new_email: email
          });

          if (sqlError) {
            console.error('Error updating email in auth table:', sqlError.message);
            alert('Error updating email in auth table');
            return;
          }

          // Successfully updated both tables
          setUserData(updatedUserData);
          setIsEditing(false);
        } else {
          alert('Please fill all fields correctly!');
        }
      } else {
        alert('User not logged in');
      }
    } catch (error) {
      console.error('Error fetching user session:', error.message);
      alert('Error fetching user session');
    }
  };




  let profilePicture;

  if (userData.profilePicture) {
    profilePicture = userData.profilePicture;
  } else {
    profilePicture = '/images/user.png';
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Navigasi ke halaman login setelah logout
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      <ProfileNav onLogout={handleLogout} />
      <div className="flex-1 p-2">
        {isEditing ? (
          <EditProfileForm
            userData={userData}
            onCancel={handleCancelEdit}
            onSubmit={handleSubmitEdit}
          />
        ) : (
          <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-center md:text-left">
              Profil
            </h1>
            <div className="border border-black mb-6"></div>
            <div className="flex flex-col lg:flex-row bg-blue-100 py-8 px-6 rounded-lg">
              <div className="flex justify-center lg:justify-start mb-6 lg:mb-0 lg:w-1/3">
                <img className="w-40 h-40 lg:w-64 lg:h-64 object-cover rounded-full border-4 border-gray-300" src={profilePicture} alt="Profile" />
              </div>
              <div className="flex flex-col lg:w-2/3 lg:pl-10">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Nama:</label>
                  <p className="text-md">{userData.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Email:</label>
                  <p className="text-md">{userData.email}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Telepon:</label>
                  <p className="text-md">{userData.phoneNumber}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Alamat:</label>
                  <p className="text-md">{userData.address}</p>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100 transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}













function EditProfileForm({ userData, onCancel, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData.profilePicture || '');
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [address, setAddress] = useState(userData.address);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(userData.profilePicture || '');
    }
  }, [selectedFile]);

  useEffect(() => {
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    setEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    const phoneNumberValid = (phone) => {
      // Basic regex for phone number validation
      const regex = /^(\+?\d{1,4}[\s-]?)?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
      return regex.test(phone);
    };

    setPhoneNumberValid(phoneNumberValid(phoneNumber));
  }, [phoneNumber]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    onSubmit({ name, email, phoneNumber, address, profilePicture: previewUrl });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-center md:text-left">
        Edit Profil
      </h1>
      <div className="border border-black mb-6"></div>
      <div className="flex flex-col lg:flex-row bg-blue-100 ml-4 py-12 p-6 rounded-lg">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center lg:w-1/3 mb-8 lg:mb-0">
          <div className="rounded-lg">
            <div className="bg-gray-300 ">
              <div className="w-64 h-64 relative">
                <label
                  htmlFor="dropzone-file"
                  className="h-full w-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex items-center justify-center"
                >
                  {previewUrl ? (
                    <div className="w-full h-full overflow-hidden rounded-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Pilih Gambar</span>
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Ukuran gambar: maks. 1 MB</p>
          <p className="text-xs text-gray-500">Format gambar: JPEG, JPG, PNG</p>
        </div>

        {/* Form Section */}
        <div className="lg:w-2/3 lg:pl-20">
          {/* Nama Input */}
          <div className="mb-8 flex items-center">
            <label htmlFor="name" className="w-1/4 block text-gray-700 font-bold">
              Nama:
            </label>
            <input
              type="text"
              maxLength={30}
              id="name"
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
              required
              placeholder="Masukkan Nama Terbaru Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center">
            <label htmlFor="email" className="w-1/4 block text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="email"
              maxLength={50}
              id="email"
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
              required
              placeholder="Masukkan Email Terbaru Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-8 flex items-center">
            <div className="w-1/4 text-gray-700"></div>
            {!emailValid && (
              <p className="text-red-500 text-sm w-full ml-2">Email tidak valid</p>
            )}
          </div>

          {/* No. Telp Input */}
          <div className="flex items-center">
            <label htmlFor="phone-number" className="w-1/4 block text-gray-700 font-bold">
              No. Telp:
            </label>
            <input
              type="number"
              id="phone-number"
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
              required
              placeholder="Masukkan Nomor Terbaru Anda"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-8 flex items-center">
            <div className="w-1/4 text-gray-700"></div>
            {!phoneNumberValid && (
              <p className="text-red-500 text-sm w-full ml-2">Nomor telepon tidak valid</p>
            )}
          </div>

          {/* Alamat Input */}
          <div className="mb-8 flex items-center">
            <label htmlFor="address" className="w-1/4 block text-gray-700 font-bold">
              Alamat:
            </label>
            <input
              type="text"
              maxLength={400}
              id="address"
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2"
              required
              placeholder="Masukkan Alamat Terbaru Anda"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex md:items-center md:justify-start md:space-x-4">
            <button
              className="bg-blue-500 mx-auto md:mx-0 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={!emailValid || !phoneNumberValid}
            >
              Simpan
            </button>
            <button
              className="bg-gray-300 mx-auto md:mx-0 text-black py-2 px-8 rounded-lg hover:bg-gray-400"
              onClick={onCancel}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
