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
        if(mode == "room"){
            console.log("Meaagein Room")
        }
        if(mode == "AI"){
            console.log("Message to Ai ")
        }
        sendPrivateMessage(socketId, selectedContact.id, text)
    };
    const roomlist = [
      
    ]

    useEffect(() => {
        if (selectedContact) {
            locateStoreage(selectedContact.id)
            synceMesage(selectedContact.id)
        }
    }, [selectedContact])

    return (
        <div className="h-screen w-screen bg-gray flex items-center justify-center">
            <div className="w-full max-w-5xl h-[90vh] md:h-[70vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-black">

                <ContactList
                    privateList={onlineUserList}
                    roomList={roomlist}
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
                    mode={mode}
                />
            </div>
        </div>
    )
}
