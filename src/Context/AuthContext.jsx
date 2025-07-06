import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userName, setuserName] = useState(null)
  const [serverStatus, setServerStatus] = useState("")
  const [isconnected , setisconnected] = useState(false)

  const API = axios.create({
    baseURL: 'https://livelinkserver.onrender.com/api'
  })


  const login = (e, p) => {
    API.post('/auth/login', { email: e, password: p }).then((r) => {
      const { token, name } = r.data;
      localStorage.setItem('token', token)
      setuserName(name)

    })
  }

  const Signup = (e, p, n) => {
    API.post('/auth/signup', { email: e, password: p, name: n }).then((result) => {
      const { token, name } = result.data
      localStorage.setItem('token', token)
      setuserName(name)
    })
  }

  const logout = () => setUser(null)

  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) setuserName(stored);
  }, []);

  useEffect(() => {
    let interval;

    const checkServer = async () => {
      try {
        await axios.get("https://livelinkserver.onrender.com");
        setServerStatus("Server Is Running");
        setisconnected(true)
        clearInterval(interval);
      } catch (error) {
        setServerStatus("Wait Server is unactive due to no user visited it will Started with in a minitues");
      }
    };

    interval = setInterval(checkServer, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <AuthContext.Provider value={{ userName, login, Signup, logout, serverStatus , isconnected}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
