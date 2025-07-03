import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const { userName } = useAuth()
  const [socket, setsocket] = useState(null)
  const [socketId, setSocketId] = useState(null)
  const [userList, setuserList] = useState([])
  const [onlineUserList, setOnlineUsers] = useState([])
 
  
  useEffect(() => {
    if (!userName) return

    const newSocket = io('https://livelinkserver.onrender.com', {
      auth: {
        userName: userName,
      },
    })

    newSocket.emit("register-user", userName);
    newSocket.on("update-users", (users) => {
      setOnlineUsers(users);
    });


    newSocket.on('connect', () => {
      setsocket(newSocket)
      setSocketId(newSocket.id)
      console.log('Socket connected:', newSocket.id)

    })

    return () => {
      newSocket.disconnect()
      newSocket.off("update-users");


    }
  }, [userName])

  return (
    <SocketContext.Provider value={{ socket, socketId, onlineUserList }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}
