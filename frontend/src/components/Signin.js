import { React, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {authActions} from "../store/index";

function Signin() {
  const base_url="http://localhost:3000";
  const dispatch=useDispatch();
  const history = useNavigate(); // Corrected hook name to useNavigate
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${base_url}/api/v1/signin`,
        inputs
      );
      sessionStorage.setItem("id",response.data.others._id); 
      dispatch(authActions.login());
      history("/note"); // Navigate to '/note' on successful signin
      setInputs({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signin error:", error);
      // Add error handling, e.g., display an error message to the user
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Sign In</h1>
      </div>
      <div className="form">
        <input
          className="form-text"
          placeholder="Email Address"
          type="text"
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />

        <input
          className="form-text"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <button className="signup-btn" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
    </div>
  );
}

export default Signin;
