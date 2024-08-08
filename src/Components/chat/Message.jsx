import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavChat from './NavChat';
import { ChatList } from './ChatList';
import ChatWindow from './ChatWindow';
import { supabase } from '../../client';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Message = () => {
  const query = useQuery();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [contacts, setContacts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
  const receiverId = query.get('receiver');

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user.id);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchContacts = async () => {
        const { data: users, error } = await supabase.from('users').select('*');
        if (error) console.error('Error fetching contacts:', error);
        else setContacts(users);
      };

      const fetchMessages = async () => {
        const { data: msgs, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
        if (error) console.error('Error fetching messages:', error);
        else {
          const groupedMessages = msgs.reduce((acc, msg) => {
            const contactId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
            (acc[contactId] = acc[contactId] || []).push(msg);
            return acc;
          }, {});
          setMessages(groupedMessages);
        }
      };

      fetchContacts();
      fetchMessages();

      // Real-time subscription
      const messageSubscription = supabase
        .channel('room1')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            const newMessage = payload.new;
            const contactId = newMessage.sender_id === userId ? newMessage.receiver_id : newMessage.sender_id;
            if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
              setMessages((prevMessages) => ({
                ...prevMessages,
                [contactId]: [...(prevMessages[contactId] || []), newMessage],
              }));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(messageSubscription);
      };
    }
  }, [userId]);

  useEffect(() => {
    if (userId && receiverId) {
      setSelectedChat(receiverId);
    }
  }, [userId, receiverId]);

  const handleSendMessage = async (message) => {
    if (!userId || !selectedChat) return;

    const newMessage = {
      sender_id: userId,
      receiver_id: selectedChat,
      text: message,
      time: new Date().toISOString(),
    };

    // Optimistically update the UI
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage],
    }));

    // Send message to Supabase
    const { data, error } = await supabase.from('messages').insert([newMessage]);
    if (error) console.error('Error sending message:', error);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (

    <div className="flex flex-col h-screen overflow-hidden">
      <NavChat toggleDrawer={toggleDrawer} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Drawer */}
        <div className={`fixed inset-y-0 left-0 w-full bg-gray-100 shadow-lg p-4 overflow-y-auto transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:static lg:w-1/3`}>
          {/* Tombol tutup drawer di dalam drawer */}
          <button onClick={toggleDrawer} className="absolute md:hidden top-4 right-4 p-2 bg-gray-300 rounded-full z-50 focus:outline-none">
            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menambahkan margin atas untuk memberi jarak antara tombol dan chatlist */}
          <div className="mt-16 md:mt-0">
            <ChatList
              messages={messages}
              contacts={contacts}
              setSelectedChat={setSelectedChat}
            />
          </div>
        </div>

        <div className="flex-1">
          <ChatWindow
            chat={messages[selectedChat]}
            selectedChat={selectedChat}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>

  );
};

export default Message;
