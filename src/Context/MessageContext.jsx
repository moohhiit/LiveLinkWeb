import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketContext'



const MessageContext = createContext()

export function MessgaeProvider({ children }) {
    const { socket } = useSocket()
    const [messages, setmessages] = useState([])



    const synceMesage = (touid) => {
        const msg = localStorage.getItem(touid)
        setmessages(msg ? JSON.parse(msg) : [])
    }

    const locateStoreage = (toUid) => {
        localStorage.setItem(toUid, JSON.stringify(messages));
    }

    const sendRoomMessage = ()=>{
        socket.emit('room_message')
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
        localStorage.setItem(to, JSON.stringify(updated))

    }
    useEffect(() => {
        if (socket) {
            socket.on('room_message' , (m)=>{
                const update = [...messages , m]
                setmessages(update)
            })
            socket.on('private_message', (m) => {
                const update = [...messages, m]
                setmessages(update)

                localStorage.setItem(m.from, JSON.stringify(update))
            })
        }
    })


    return (
        <MessageContext.Provider value={{ sendPrivateMessage, messages, synceMesage, locateStoreage ,setmessages}} >
            {children}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    return useContext(MessageContext)
}