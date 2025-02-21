import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";
import "./Signup.css";

const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/note");
    }
  }, [isLoggedIn, navigate]);

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
      const response = await axios.post(`${base_url}/api/v1/register`, inputs);
      if (response.data.message === "User already exists") {
        toast.warning(response.data.message);
      } else {
        toast.success(response.data.message);
        setInputs({ email: "", username: "", password: "" });
        navigate("/signin");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration Failed!");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        await axios.post(`${base_url}/api/v1/googleLogin`, {
          email: data.email,
          username: data.name,
          googleId: data.sub,
        });

        dispatch(authActions.login({ username: data.name, email: data.email }));
        toast.success("Google Login Successful");
        navigate("/note");
      } catch (err) {
        console.error("Google Login error:", err);
        toast.error("Google Login Failed!");
      }
    },
    onError: (err) => {
      console.error("Google Login Failed:", err);
      toast.error("Google Login Failed!");
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            type="email"
            name="email"
            autoComplete="email"
            onChange={change}
            value={inputs.email}
          />
          <input
            className="form-text"
            placeholder="Username"
            type="text"
            name="username"
            autoComplete="username"
            onChange={change}
            value={inputs.username}
          />
          <div className="password-container">
            <input
              className="form-text"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              onChange={change}
              value={inputs.password}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button className="signup-btn" onClick={submit}>
            Sign Up
          </button>
          <button className="google-login-btn" onClick={() => googleLogin()}>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
