import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmailId] = useState("vijay@gmail.com");
  const [password, setPassword] = useState("Vijay@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  //const [form, setForm] = useState({firstName : "", lastName: "", email: "", password: ""})

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },

        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data));
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err?.response?.data || "something went wrong");
      } else {
        console.error("Login error: ", err?.response?.data);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid Credentials");
      } else {
        console.error("Login error: ", err?.response?.data);
      }
    }
  };

  return {
    handleLogin,
    handleSignUp,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmailId,
    password,
    setPassword,
    error
  };
};

export default useLogin;
