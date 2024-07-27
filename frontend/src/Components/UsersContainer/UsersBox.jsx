import React from 'react'
import User from './User'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUserData } from '../../redux/Slice/user.Slice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearMessageData } from '../../redux/Slice/message.Slice';


function UsersBox() {

  const otherUser = useSelector(state => state.user.otherUserData);
  const { authdata } = useSelector((state) => state.user)
  const navigate = useNavigate();
const dispatch=useDispatch();



  const logoutHandler = async () => {
    try {

      const res = await axios.get('/api/auth/logout'); // Using the centralized Axios instance
  
      // console.log(res)
      toast.success(res.data.message);
      dispatch(clearUserData());
      dispatch(clearMessageData());
      navigate("/")


    } catch (error) {
      console.log(error);
    }
  }







  // Check if otherUser is an array
  if (!Array.isArray(otherUser)) {
    // Handle the case where otherUser is not an array
    return <p>No other users found.</p>;
  }


  return (
    <div className='flex flex-col h-full    w-full  p-2'>

      <div className='rounded-lg border-2 border-yellow-500'>
        <h3 className='bg-black text-center text-white p-5 rounded-lg'>{authdata?.fullName}</h3>
      </div>

      <div className='flex-grow  h-96 overflow-y-auto'>
        {
          otherUser.map((user) => (
            <User key={user._id} user={user} />
          ))
        }
      </div>

      <div className=' p-2'>
        <button onClick={logoutHandler} className='bg-black text-white border-2 border-red-500 p-3  hover:transition-transform duration-200 hover:scale-90  hover:bg-red-500 hover:text-black rounded-lg'>Logout</button>
      </div>

    </div>

  )
}

export default UsersBox