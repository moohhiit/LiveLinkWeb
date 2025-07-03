import React from 'react';
import MessageInput from './MessageInput';

const ChatScreen = ({ contact, messages, onSend , id }) => {
    if (!contact) {
        return (
            <div className="w-full md:w-2/3 flex items-center justify-center text-black">
                <p className="text-xl">Select a contact to start chatting</p>
            </div>
        );
    }

    return (
        <div className="w-full md:w-2/3 flex flex-col p-4 text-black">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Chat with {contact.username}
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2 scrollbar-hidden" id="chat-scroll">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 rounded max-w-xs ${msg.from !== id
                                ? 'ml-auto bg-blue-200'
                                : 'mr-auto bg-gray-300'
                            }`}
                    >
                        <p className="text-black">{msg.message}</p>
                    </div>
                ))}
            </div>

            <MessageInput onSend={onSend} />
        </div>
    );
};

export default ChatScreen;
