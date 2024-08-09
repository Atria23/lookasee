
import React, { useRef, useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import { supabase } from '../../client';

const ChatWindow = ({ chat, selectedChat, onSendMessage }) => {
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [users, setUsers] = useState({}); // Map of userId to user details

  const chatEndRef = useRef(null); // Membuat referensi ke elemen akhir chat

  // Auto-scroll ke bagian bawah setiap kali pesan berubah
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]); // Dependency array menggunakan chat untuk mendeteksi perubahan

  // Fetch logged-in user ID
  useEffect(() => {
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
  useEffect(() => {
    const fetchUser = async () => {
      if (selectedChat) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', selectedChat)
          .single();
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
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        const userMap = {};
        data.forEach((u) => (userMap[u.id] = u));
        setUsers(userMap);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col bg-bg_utama justify-between p-4 h-full">
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
          <img src="/images/chat_kosong.png" className="w-80 mb-4" />
          <h1 className="font-semibold font-poppins text-xl mb-2">
            Selamat Datang!
          </h1>
          <p className="font-medium font-poppins text-md text-center">
            Temukan Barang-mu! <br /> Hubungi orang yang kamu butuhkan!
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {chat &&
          chat.map((message, index) => {
            const sender = users[message.sender_id];
            return (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender_id === loggedInUserId
                    ? 'bg-blue-200 text-right'
                    : 'bg-white'
                }`}
              >
                <div className="text-sm">
                  <div className="font-semibold mb-1">{sender.name}</div>
                  {message.text}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(message.time).toLocaleTimeString()}
                </div>
              </div>
            );
          })}
        {/* Elemen untuk auto-scroll */}
        <div ref={chatEndRef} />
      </div>

      {selectedChat && <MessageInput onSendMessage={onSendMessage} />}
    </div>
  );
};

export default ChatWindow;
