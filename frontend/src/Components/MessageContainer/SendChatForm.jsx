import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'; // Import IoSend icon from react-icons/io5
import { useDispatch, useSelector } from 'react-redux';
import { storedMessageData } from '../../redux/Slice/message.Slice';


function SendChatForm() {

    const selectedUssr = useSelector((state) => state.user.selectedUser)

    const [getMessage, setGetMessage] = useState("");
    const dispatch = useDispatch();
    const message = useSelector((state) => state.messages.message)



    const submitMessageHandler = async (e) => {


        e.preventDefault();
        try {
            const res = await axios.post(`/api/message/send/${selectedUssr?._id}`, 
            {
              message: getMessage
            }, 
            {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            // console.log("created mmmmmmmmmmm", res.data);
            dispatch(storedMessageData([...message, res?.data?.newMessage]));
          } 
        
        
        
        catch (error) {
            console.log("errror in the posting message", error);
        }

        setGetMessage("");

    }
    return (
        <form onSubmit={submitMessageHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={getMessage}
                    onChange={(e) => setGetMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full  p-3 border-green-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 bg-green-500 hover:scale-90 rounded-lg pl-2 end-0 items-center pr-3 shadow-lg hover:shadow-xl transition-transform duration-150'>
                    <IoSend />
                </button>

            </div>
        </form>
    )
}

export default SendChatForm
