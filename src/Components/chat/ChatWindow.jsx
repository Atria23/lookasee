// import React from 'react';
// import MessageInput from './MessageInput';
// import { userAccount } from '../data/UserAccount';
// import { useNavigate } from "react-router-dom";

// const getUserByName = (name) => {
//   return userAccount.find(user => user.name === name);
// };

// const ChatWindow = ({ chat, selectedChat, onSendMessage }) => {
//   const user = selectedChat ? getUserByName(selectedChat) : null;
//   const navigate = useNavigate();

//   return (
//     <div className="w-2/3 flex flex-col bg-bg_utama justify-between p-4 h-full">
//       {/* Navbar dengan foto profil atau gambar default */}
//       {selectedChat && user ? (
//         <div className="flex items-center py-2 px-2 mb-4 bg-slate-100">
//           <img
//             src={user.avatar}
//             alt="Profile"
//             className="w-10 h-10 rounded-full mr-3"
//           />
//           <span className="font-semibold">{user.name}</span>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center mx-auto  h-full">
//           <img
//             src="/images/chat_kosong.png" // Ganti dengan path gambar default kamu  
//             className="w-80 mb-4"
//           />
//           <h1 className='font-semibold font-poppins text-xl mb-2'>
//             Welcome!
//           </h1>
//           <p className='font-medium font-poppins text-md text-center'>
//             Find Your Lost Items! <br /> Contact the person you need!
//           </p>
//         </div>
//       )}

//       {/* Daftar pesan */}
//       <div className="flex-1 overflow-y-auto">
//         {chat && chat.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded-lg ${message.sender === 'you' ? 'bg-blue-200 text-right' : 'bg-white'}`}
//           >
//             <div className="text-sm">{message.text}</div>
//             <div className="text-xs text-gray-500">{message.time}</div>
//           </div>
//         ))}
//       </div>

//       {/* Input pesan */}
//       {selectedChat && <MessageInput onSendMessage={onSendMessage} />}
//     </div>
//   );
// };

// export default ChatWindow;

import React from 'react';
import MessageInput from './MessageInput';
import { supabase } from '../../client';

const ChatWindow = ({ chat, selectedChat, onSendMessage }) => {
  const [user, setUser] = React.useState(null);
  const [loggedInUserId, setLoggedInUserId] = React.useState(null);
  const [users, setUsers] = React.useState({}); // Map of userId to user details

  // Fetch logged-in user ID
  React.useEffect(() => {
    const fetchLoggedInUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching logged-in user:', error);
      } else {
        setLoggedInUserId(user.id);
      }
    };

    fetchLoggedInUserId();
  }, []);

  // Fetch selected user profile
  React.useEffect(() => {
    const fetchUser = async () => {
      if (selectedChat) {
        const { data: user, error } = await supabase.from('users').select('*').eq('id', selectedChat).single();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(user);
        }
      }
    };

    fetchUser();
  }, [selectedChat]);

  // Fetch users for message sender names
  React.useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        const userMap = {};
        data.forEach(u => userMap[u.id] = u);
        setUsers(userMap);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-2/3 flex flex-col bg-bg_utama justify-between p-4 h-full">
      {selectedChat && user ? (
        <div className="flex items-center py-2 px-2 mb-4 bg-slate-100">
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-9 h-9 overflow-hidden rounded-full object-cover mr-3"
          />
          <span className="font-semibold">{user.name}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto h-full">
          <img
            src="/images/chat_kosong.png"
            className="w-80 mb-4"
          />
          <h1 className='font-semibold font-poppins text-xl mb-2'>
            Selamat Datang!
          </h1>
          <p className='font-medium font-poppins text-md text-center'>
            Temukan Barang-mu! <br /> Hubungi orang yang kamu butuhkan!
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {chat && chat.map((message, index) => {
          const sender = users[message.sender_id];
          return (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${message.sender_id === loggedInUserId ? 'bg-blue-200 text-right' : 'bg-white'}`}
            >
              {message.sender_id !== loggedInUserId }
              <div className="text-sm">
                {message.sender_id === loggedInUserId ? '' : ''}
                <div className="font-semibold mb-1">
                  {sender.name}
                </div>
                {message.text}
              </div>
              <div className="text-xs text-gray-500">{new Date(message.time).toLocaleTimeString()}</div>
            </div>
          );
        })}
      </div>

      {selectedChat && <MessageInput onSendMessage={onSendMessage} />}
    </div>
  );
};

export default ChatWindow;
