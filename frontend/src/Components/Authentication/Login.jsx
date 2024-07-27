import React, { useState } from 'react'

import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import {  storeAuthData } from '../../redux/Slice/user.Slice';
// import {storeAuthData} from "../../redux/Slice/user.Slice"
import { useDispatch } from 'react-redux';
import { storeAuthData } from '../../redux/Slice/user.Slice';


function Login() {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // ....login data Stored...
  const [loginData, setLogindata] = useState({

    email: "",
    password: ""
  })



  // ..............change input data handler...........
  const handleUserInput = (e) => {

    const { name, value } = e.target;
    setLogindata({
      ...loginData,
      [name]: value
    })
  }





  const submitHandler = async () => {
//  console.log(loginData)
    try {


      hadlecheck(loginData);

    
    
      const res = await axios.post('/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        },
        
      });



      // console.log("autha data",res.data);
      dispatch(storeAuthData(res.data));
      toast.success(res.data.success);
      navigate("/chat");







      // toast.error(res.data.message, {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   style: {
      //     borderRadius: '10px',
      //     color: "red"
      //   },
      // });






  
    } catch (error) {
     
      console.error('Error occurred during signup:', error);
    }


  }
  const hadlecheck = (loginData) => {
    if (!loginData.password || !loginData.email) {
      toast.error("all filed are required");
    }

  }

  return (
    <VStack spacing="5px">



      {/* ..........Email....... */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email Address"

          value={loginData.email}

          onChange={handleUserInput}
        />
      </FormControl>

      {/* ..........Password....... */}

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name='password'

            value={loginData.password}
            onChange={handleUserInput}


          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>



      {/* ..........signup btn....... */}
      <Button
        colorScheme="yellow"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}




      >
        Login
      </Button>



    </VStack>
  )
}

export default Login
