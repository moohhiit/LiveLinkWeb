import React, { useEffect, useState } from 'react';
import ContactList from './component/ContactList';
import ChatScreen from './component/ChatScreen';
import AuthPage from './Auth/AuthPage';
import socket from './services/Socket.js';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './component/ProtectRoute.jsx';
import ChatPage from './page/ChatPage.jsx';


function App() {
  
  return(
    <Routes>
      <Route path='/login' element={<AuthPage/>} />
      <Route 
      path='/'
      element={
        <ProtectedRoute>
          <ChatPage/>
        </ProtectedRoute>
      }
      
      />
    </Routes>
  )

}

export default App;
