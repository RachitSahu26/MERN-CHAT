import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import axios from 'axios';

import toast from 'react-hot-toast';


// import { sign } from 'jsonwebtoken';

function Signup() {
  const [show, setShow] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",

    gender: "" // New field for gender
  });
  // const dispatch = useDispatch();

  const handleClick = () => setShow(!show);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const submitHandler = async () => {

    try {
      const res = await axios.post('/api/auth/register', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {

        toast.success(res.data.message);
      }

      setSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",

        gender: "" // Reset gender field
      });

    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

  return (
    <VStack spacing="5px">
      {/* Name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Full Name"
          name="fullName"
          onChange={handleUserInput}
          value={signupData.fullName}
        />
      </FormControl>



      {/* Email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          onChange={handleUserInput}
          value={signupData.email}
        />
      </FormControl>



      {/* Password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={handleUserInput}
            value={signupData.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>



      {/* Confirm Password */}
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleUserInput}
            value={signupData.confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>




      {/* Gender */}
      <FormControl id="gender">
        <FormLabel>Gender</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Gender"
          name="gender"
          onChange={handleUserInput}
          value={signupData.gender}
        />
      </FormControl>



      {/* Signup Button */}
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
