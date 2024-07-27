import React from 'react';
import UsersBox from '../Components/UsersContainer/UsersBox';
import { useDispatch, useSelector } from 'react-redux';
import otherUser from '../hooks/otherUser';

import useMedia from 'use-media';
import MessageArea from '../Components/MessageContainer/MessageArea';
import fetchMessage from '../hooks/fetchMessage'



function Chat() {
  const { authdata, selectedUser } = useSelector((state) => state.user); // Assuming selectedUser is in your user slice
  const { storedMessageData } = useSelector((state) => state.messages); // Assuming selectedUser is in your user slice


  // Media query to check if screen width is less than or equal to 768px
  const isMobile = useMedia({ maxWidth: 768 });
 
    otherUser();
    fetchMessage();



  return (
    <div className='h-screen bg-black flex justify-center'>
      {isMobile ? (
        <div className='border-2 h-auto border-teal-300 bg-black w-full'>
          <div className='bg-black h-full overflow-y-auto'>
            <UsersBox />
          </div>
          {selectedUser && ( // Only render if a user is selected
            <div className='bg-black rounded-lg h-full border-2 border-teal-300 justify-center m-3'>
              <MessageArea />
            </div>
          )}
        </div>
      ) : (
        <div className='w-[80%] bg-black   p-5 flex justify-evenly'>
          <div className='w-full bg-black border-2 border-teal-300 overflow-y-auto p-5 rounded-lg'>
            <UsersBox />
          </div>
          {selectedUser && ( // Only render if a user is selected
            <div className='w-full bg-black justify-center m-3'>
              <MessageArea />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;