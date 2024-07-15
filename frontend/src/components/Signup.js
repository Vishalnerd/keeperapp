import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        inputs
      );
      if (response.data.message === "User already exists") {
        toast.warning(response.data.message);
      } else {
        toast.success(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        history("/signin");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-heading">
          <h1>Sign Up</h1>
        </div>
        <div className="form">
          <input
            className="form-text"
            placeholder="Email Address"
            type="text"
            name="email"
            onChange={change}
            value={inputs.email}
          />
          <input
            className="form-text"
            placeholder="Username"
            type="text"
            name="username"
            onChange={change}
            value={inputs.username}
          />
          <input
            className="form-text"
            placeholder="Password"
            type="password"
            name="password"
            onChange={change}
            value={inputs.password}
          />
          <button className="signup-btn" onClick={submit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
