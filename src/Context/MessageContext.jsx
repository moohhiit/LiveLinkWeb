import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketContext'



const MessageContext = createContext()

export function MessgaeProvider({ children }) {
    const { socket } = useSocket()
    const [messages, setmessages] = useState([])
    const [chatkey, setchatkey] = useState()



    const synceMesage = () => {
        if (chatkey) {

            const msg = localStorage.getItem(chatkey)
            setmessages(msg ? JSON.parse(msg) : [])
        }
    }

    const locateStoreage = (fromUid, toUid) => {
        const chatKey = `chat_${[fromUid, toUid].sort().join('_')}`;
        setchatkey(chatKey)
        localStorage.setItem(chatKey, JSON.stringify(messages));
    }


    // semderId = MyId 

    const sendPrivateMessage = (from, to, message) => {
        socket.emit('private_message', { from, to, message })
        const mmsg = {
            to,
            from,
            message,
            timestamp: Date.now(),
        }
        const updated = [...messages, mmsg];
        setmessages(updated)
        localStorage.setItem(chatkey, updated)

    }
    useEffect(() => {
        if (socket) {

            socket.on('private_message', (m) => {
                const update = [...messages, m]
                setmessages(update)

                localStorage.setItem(chatkey, update)
            })
        }
    })


    return (
        <MessageContext.Provider value={{ sendPrivateMessage, messages, synceMesage, locateStoreage }} >
            {children}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    return useContext(MessageContext)
}