// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import NavChat from './NavChat';
// import { ChatList } from './ChatList';
// import ChatWindow from './ChatWindow';
// import { supabase } from '../../client';

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const Message = () => {
//   const query = useQuery();
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [contacts, setContacts] = useState([]);
//   const [showContacts, setShowContacts] = useState(false); // State to toggle contact display
//   const [userId, setUserId] = useState(null); // State to store logged-in user ID
//   const receiverId = query.get('receiver'); // Get receiver ID from query parameter

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const { data: { user }, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error('Error fetching user:', error);
//       } else {
//         setUserId(user.id);
//       }
//     };

//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       // Fetch user contacts
//       const fetchContacts = async () => {
//         const { data: users, error } = await supabase.from('users').select('*');
//         if (error) console.error('Error fetching contacts:', error);
//         else setContacts(users);
//       };

//       // Fetch initial messages
//       const fetchMessages = async () => {
//         const { data: msgs, error } = await supabase
//           .from('messages')
//           .select('*')
//           .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
//         if (error) console.error('Error fetching messages:', error);
//         else {
//           const groupedMessages = msgs.reduce((acc, msg) => {
//             const contactId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
//             (acc[contactId] = acc[contactId] || []).push(msg);
//             return acc;
//           }, {});
//           setMessages(groupedMessages);
//         }
//       };

//       fetchContacts();
//       fetchMessages();

//       // Subscribe to real-time messages
//       const messageSubscription = supabase
//         .channel('room1')
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages' },
//           (payload) => {
//             const newMessage = payload.new;
//             const contactId = newMessage.sender_id === userId ? newMessage.receiver_id : newMessage.sender_id;
//             if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
//               setMessages((prevMessages) => ({
//                 ...prevMessages,
//                 [contactId]: [...(prevMessages[contactId] || []), newMessage],
//               }));
//             }
//           }
//         )
//         .subscribe();

//       return () => {
//         supabase.removeChannel(messageSubscription);
//       };
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId && receiverId) {
//       setSelectedChat(receiverId);
//       setShowContacts(true); // Show contacts when a chat is initiated
//     }
//   }, [userId, receiverId]);

//   const handleSendMessage = async (message) => {
//     if (!userId || !selectedChat) return;

//     const newMessage = {
//       sender_id: userId,
//       receiver_id: selectedChat,
//       text: message,
//       time: new Date().toISOString(),
//     };

//     const { data, error } = await supabase.from('messages').insert([newMessage]);
//     if (error) console.error('Error sending message:', error);
//   };

//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       <NavChat />
//       <div className="flex flex-1 overflow-hidden">
//         {showContacts ? (
//           <ChatList 
//             messages={messages} 
//             contacts={contacts} 
//             setSelectedChat={setSelectedChat} 
//             receiverId={receiverId} // Pass receiverId to filter contacts
//           />
//         ) : (
//           <div className="flex flex-1 justify-center items-center">
//             <p>Select a contact to start chatting.</p>
//           </div>
//         )}
//         <ChatWindow 
//           chat={messages[selectedChat]} 
//           selectedChat={selectedChat} 
//           onSendMessage={handleSendMessage} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Message;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import NavChat from './NavChat';
// import { ChatList } from './ChatList';
// import ChatWindow from './ChatWindow';
// import { supabase } from '../../client';

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const Message = () => {
//   const query = useQuery();
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [contacts, setContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [userId, setUserId] = useState(null);
//   const receiverId = query.get('receiver');

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const { data: { user }, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error('Error fetching user:', error);
//       } else {
//         setUserId(user.id);
//       }
//     };

//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const fetchContacts = async () => {
//         const { data: users, error } = await supabase.from('users').select('*');
//         if (error) console.error('Error fetching contacts:', error);
//         else setContacts(users);
//       };

//       const fetchMessages = async () => {
//         const { data: msgs, error } = await supabase
//           .from('messages')
//           .select('*')
//           .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
//         if (error) console.error('Error fetching messages:', error);
//         else {
//           const groupedMessages = msgs.reduce((acc, msg) => {
//             const contactId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
//             (acc[contactId] = acc[contactId] || []).push(msg);
//             return acc;
//           }, {});
//           setMessages(groupedMessages);
//         }
//       };

//       fetchContacts();
//       fetchMessages();

//       // Real-time subscription
//       const messageSubscription = supabase
//         .channel('room1')
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages' },
//           (payload) => {
//             const newMessage = payload.new;
//             const contactId = newMessage.sender_id === userId ? newMessage.receiver_id : newMessage.sender_id;
//             if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
//               setMessages((prevMessages) => ({
//                 ...prevMessages,
//                 [contactId]: [...(prevMessages[contactId] || []), newMessage],
//               }));
//             }
//           }
//         )
//         .subscribe();

//       return () => {
//         supabase.removeChannel(messageSubscription);
//       };
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId && receiverId) {
//       setSelectedChat(receiverId);
//     }
//   }, [userId, receiverId]);

//   const handleSendMessage = async (message) => {
//     if (!userId || !selectedChat) return;

//     const newMessage = {
//       sender_id: userId,
//       receiver_id: selectedChat,
//       text: message,
//       time: new Date().toISOString(),
//     };

//     // Optimistically update the UI
//     setMessages((prevMessages) => ({
//       ...prevMessages,
//       [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage],
//     }));

//     // Send message to Supabase
//     const { data, error } = await supabase.from('messages').insert([newMessage]);
//     if (error) console.error('Error sending message:', error);
//   };

//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       <NavChat />
//       <div className="flex flex-1 overflow-hidden">
//         <ChatList 
//           messages={messages} 
//           contacts={contacts} 
//           setSelectedChat={setSelectedChat} 
//         />
//         <ChatWindow 
//           chat={messages[selectedChat]} 
//           selectedChat={selectedChat} 
//           onSendMessage={handleSendMessage} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Message;

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

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavChat />
      <div className="flex flex-1 overflow-hidden">
        <ChatList 
          messages={messages} 
          contacts={contacts} 
          setSelectedChat={setSelectedChat} 
        />
        <ChatWindow 
          chat={messages[selectedChat]} 
          selectedChat={selectedChat} 
          onSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
};

export default Message;
