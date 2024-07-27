import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './Pages/Chat';
import Home from './Pages/Home';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { storeSocketData } from './redux/Slice/socket.Slice';
import { storeOnlineUser } from './redux/Slice/user.Slice';
import io from "socket.io-client"
import { storedMessageData } from './redux/Slice/message.Slice';
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { authdata } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.messages)
  useEffect(() => {
    let socket = null;
    if (authdata) {
    
      socket = io(`${import.meta.env.VITE_API_URL}`, {
        query: {
          authId: authdata._id
        },
      });
      



      console.log(socket)
      dispatch(storeSocketData(socket));

      socket.on("connect", () => {
        toast.success('Connected to server');
      });

      socket.on("disconnect", () => {
        toast.error('Disconnected from server');
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(storeOnlineUser(onlineUsers));
      });

      socket.on('newMessage', (newMessage) => {
        // console.log('Received new message:', newMessage);
        dispatch(storedMessageData([...message, newMessage]))
        toast.success('New Message came');
      });


      socket.on("connect_error", (error) => {
        toast.error(`Socket connection error: ${error.message}`);
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authdata, dispatch]);




  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
      

        <Route path="/chat" element={<Chat />} /> {/* Protect chat route */}
      </Routes>
      
      <Toaster />
    </>
  );
}

export default App;