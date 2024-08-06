// import React, { useState } from 'react';

// const MessageInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState('');

//   const handleSend = () => {
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && message.trim()) {
//       handleSend();
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <input 
//         type="text" 
//         className="flex-1 p-2 border border-gray-300 rounded"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown} // Menangani event ketika tombol ditekan di keyboard
//       />
//       <button 
//         className="ml-2 p-2 bg-blue-500 text-white rounded"
//         onClick={handleSend} // Menangani event ketika tombol Send diklik
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default MessageInput;

// MessageInput.js

import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSend();
    }
  };

  return (
    <div className="flex items-center">
      <input 
        type="text" 
        className="flex-1 p-2 border border-gray-300 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button 
        className="ml-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
