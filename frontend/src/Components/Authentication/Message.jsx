import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// import fetchMessage from '../../hooks/fetchMessage';


function Message({ message }) {
  const { authdata, selectedUser } = useSelector((state) => state.user);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    

    
  }, [message]);




  return (



    <div ref={scroll} className={`chat p-4  ${authdata?._id === message?.senderId ? 'chat-end' : 'chat-start '} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={`${message?.senderId === authdata?._id ? authdata?.profilePhoto : selectedUser?.profilePhoto}`} />
        </div>
      </div>
  
      <div className={`${authdata?._id === message?.senderId ? 'chat-bubble-info p-2 rounded-lg' : 'chat-bubble-warning p-2 rounded-lg '}`}>{message?.message}</div>


    </div>

  )
}

export default Message
