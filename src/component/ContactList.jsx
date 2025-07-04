import React from 'react';
import { useSocket } from '../Context/SocketContext';
import { useEffect } from 'react';

const ContactList = ({ privateList, contacts, onSelect, selectedId, mode, setMode, roomList }) => {
    const { socketId } = useSocket()
    useEffect(() => {
        console.log(privateList.length)
    })
    return (
        <div className="w-full md:w-1/3 bg-gray-100 p-4 border-r overflow-y-auto text-black flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">LiveLink</h2>

            <div className="flex justify-between space-x-1 mb-4">

                <div
                    onClick={() =>{ 
                        onSelect(null)
                        setMode('room')}}
                    className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium ${mode === 'room'
                        ? 'bg-white text-black shadow'
                        : 'bg-gray-100 text-gray-700 '
                        }`}
                >
                    Room
                </div>
                <div
                    onClick={() => {
                        onSelect(null)
                        setMode('private')}}
                    className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium ${mode === 'private'
                        ? 'bg-white text-black shadow'
                        : 'bg-gray-100 text-gray-700 '
                        }`}
                >
                    Private
                </div>
                <div
                    onClick={() => {
                        onSelect(null)
                        setMode('AI')}}
                    className={`cursor-pointer px-6 py-1 rounded-full text-sm font-medium ${mode === 'AI'
                        ? 'bg-white text-black shadow'
                        : 'bg-gray-100 text-gray-700 '
                        }`}
                >
                    AI
                </div>
            </div>

            <ul className="space-y-2">
                {
                    mode === 'room' ?
                        <>
                            {
                                roomList.length > 1 ? <>

                                    {roomList.map((room) => {

                                        return (

                                            room.id !== socketId ?

                                                <li
                                                    key={room.id}
                                                    onClick={() => onSelect(room)}
                                                    className={`p-2 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 ${selectedId === room.id ? 'bg-gray-300' : ''
                                                        }`}
                                                >

                                                    <span className="text-left">{room.roomName} <span className='text-xs text-gray-800' >{`#${room.roomId}`}</span> </span>
                                                </li>
                                                : null
                                        )
                                    }
                                    )}

                                </> : <>
                                    <p className="text-xl">No Room Live</p>
                                </>

                            }

                        </> : <>
                            {
                                privateList.length > 1 ?
                                    <>
                                        {privateList.map((contact) => {

                                            return (

                                                contact.id !== socketId ?

                                                    <li
                                                        key={contact.id}
                                                        onClick={() => onSelect(contact)}
                                                        className={`p-2 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 ${selectedId === contact.id ? 'bg-gray-300' : ''
                                                            }`}
                                                    >

                                                        <span className="text-left">{contact.username} <span className='text-xs text-gray-800' >{`#${contact.id}`}</span> </span>
                                                    </li>
                                                    : null
                                            )
                                        }
                                        )}

                                    </> :
                                    <>
                                        <p className="text-xl">No Persion is Live</p>
                                    </>
                            }
                        </>
                }

            </ul>
        </div>
    );
};

export default ContactList;
