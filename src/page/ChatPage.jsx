import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ContactList from '../component/ContactList';
import ChatScreen from '../component/ChatScreen';
import { useSocket } from '../Context/SocketContext';
import { useMessage } from '../Context/MessageContext';

export default function ChatPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [user, setUser] = useState(null);

    const [mode, setMode] = useState('private');

    const { sendPrivateMessage, messages, synceMesage, locateStoreage } = useMessage()
    const { socket, socketId, onlineUserList } = useSocket()


    const handleSendMessage = (text) => {
        if (!selectedContact) return;
        sendPrivateMessage(socketId, selectedContact.id, text)
  

    };

    useEffect(() => {
        if (selectedContact) {
            locateStoreage(socketId, selectedContact.id)
            // synceMesage()
        }
    }, [selectedContact])

    return (
        <div className="h-screen w-screen bg-gray flex items-center justify-center">
            <div className="w-full max-w-5xl h-[90vh] md:h-[70vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-black">

                <ContactList
                    privateList={onlineUserList}

                    onSelect={setSelectedContact}
                    selectedId={selectedContact?.id}
                    mode={mode}
                    setMode={setMode}
                />
                <ChatScreen
                    id={socketId}
                    contact={selectedContact}
                    messages={messages}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    )
}
