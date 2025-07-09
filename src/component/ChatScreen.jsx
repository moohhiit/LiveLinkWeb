import React, { useState } from 'react';
import MessageInput from './MessageInput';
import BrainCoreCanvas from '../assets/BrainCoreCanvas';
import { useSocket } from '../Context/SocketContext';

const ChatScreen = ({ contact, messages, onSend, id, mode }) => {
    const [isCreate, setisCreate] = useState(false)
    const [roomName, setroomName] = useState('')
    const [roomCreated , setroomCreated]= useState(false)

    const { create_room, socketId } = useSocket()

    const handleRoomCreate = () => {
        create_room(roomName, socketId)
        setroomName('')
        isCreate(false)

    }

    if (!contact) {
        return (
            <div className="w-full md:w-2/3 flex items-center justify-center text-black">
                {
                    mode == "room" ? isCreate ? <>
                        <div
                            className="space-y-4">
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                Create Room
                            </h2>
                            <input
                                type="test"
                                placeholder="Room Name"
                                className="w-full p-2 border rounded"
                                value={roomName}
                                onChange={(e) => setroomName(e.target.value)}
                                required
                            />


                            <button
                                onClick={handleRoomCreate}
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Create Room
                            </button>
                        </div>

                    </> : <>
                        <button
                            onClick={() => {
                                setisCreate(true)
                            }}
                            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Create Room
                        </button>
                    </> :
                        <p className="text-xl">Select a contact to start chatting</p>
                }
            </div>
        );
    }

    return (
        <div className="w-full md:w-2/3 flex flex-col p-4 text-black">
            {
                contact.id == "22082005" ?
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-3  px-6 py-3 rounded-xl">
                            <div className="w-8 h-8">
                                {messages.length > 0 ? <BrainCoreCanvas size={32} /> : null}
                            </div>
                            <h2 className="text-black text-lg font-semibold">Hello, I'm Pavika </h2>
                        </div>
                    </div> :
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Chat with {contact.username ? contact.username : contact.room_name} 
                    </h2>
            }

            <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2 scrollbar-hidden" id="chat-scroll">
                {
                    messages.length > 0 ? <>{messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-3 rounded max-w-xs ${msg.from !== id
                                ? 'ml-auto bg-blue-200'
                                : 'mr-auto bg-gray-300'
                                }`}
                        >
                            <p className="text-black">{msg.message}</p>
                        </div>
                    ))}</> : <>

                        {
                            mode != "AI" ? null :
                                <div style={{
                                    width: "100%",
                                    height: "300px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }} >
                                    <BrainCoreCanvas />
                                </div>
                        }
                    </>
                }

            </div>

            {mode == "AI" ? <h2 className="text-2xl font-semibold mb-4 text-center">
                Currently I am Working On modal
            </h2> : <MessageInput onSend={onSend} />}
        </div>
    );
};

export default ChatScreen;
