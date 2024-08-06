// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// export const ChatList = ({ messages, contacts, setSelectedChat, receiverId }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const filtered = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (receiverId) {
//       setFilteredContacts(filtered.filter(contact => contact.id === receiverId));
//     } else {
//       setFilteredContacts(filtered);
//     }
//   }, [contacts, searchTerm, receiverId]);

//   return (
//     <div className="w-1/3 bg-gray-100 bg-white shadow-lg p-4 overflow-y-auto">
//       <div className="mb-4 relative">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full p-2 pl-10 border border-gray-300 rounded"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <svg
//           className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-4.35-4.35"
//           />
//         </svg>
//       </div>
//       {filteredContacts.length > 0 ? (
//         filteredContacts.map(contact => {
//           const contactMessages = messages[contact.id] || [];
//           const lastMessage = contactMessages[contactMessages.length - 1];

//           return (
//             <div
//               key={contact.id}
//               className="p-2 border-b cursor-pointer"
//               onClick={() => setSelectedChat(contact.id)}
//             >
//               <div className="font-bold">{contact.name}</div>
//               <div className="text-sm text-gray-600">
//                 {lastMessage ? lastMessage.text : 'No messages yet'}
//               </div>
//               <div className="text-xs text-gray-400">
//                 {lastMessage ? format(new Date(lastMessage.time), 'MM/dd/yyyy HH:mm') : ''}
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div className="p-2 text-gray-600">No contacts found</div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";


export const ChatList = ({ messages, contacts, setSelectedChat }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Filter contacts based on the search term and ensure they have messages
    const filtered = contacts.filter(contact => {
      // Check if the contact has interacted with the logged-in user
      const hasMessages = messages[contact.id] && messages[contact.id].length > 0;
      return hasMessages && contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredContacts(filtered);
  }, [contacts, messages, searchTerm]);

  return (
    <div className="w-1/3 bg-gray-100 bg-white shadow-lg p-4 overflow-y-auto">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-4.35-4.35"
          />
        </svg>
      </div>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(contact => {
          const contactMessages = messages[contact.id] || [];
          const lastMessage = contactMessages[contactMessages.length - 1];

          return (
            <div
              key={contact.id}
              className="p-2 border-b cursor-pointer"
              onClick={() => setSelectedChat(contact.id)}
            >
              <div className="font-bold">{contact.name}</div>
              <div className="text-sm text-gray-600">
                {lastMessage ? lastMessage.text : 'No messages yet'}
              </div>
              <div className="text-xs text-gray-400">
                {lastMessage ? format(new Date(lastMessage.time), 'MM/dd/yyyy HH:mm') : ''}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-2 text-gray-600 cursor-pointer">Tidak ada kontak yang ditemukan <br /> Silahkan mulai percakapan
          <p className="mb-4 text-utama">
            <a onClick={() => navigate("/userguide")} className="hover:underline">Cara Penggunaan</a>
          </p></div>

      )}
    </div>
  );
};
