import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
   <form
  className="flex items-center  pt-2"
  onSubmit={(e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  }}
>
  <input
    type="text"
    placeholder="Type a message"
    className="flex-1 border p-2 rounded mr-2 text-black"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={handleSend}
  >
    Send
  </button>
</form>

  );
};

export default MessageInput;
