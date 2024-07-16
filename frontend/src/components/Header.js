import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import HighlightIcon from '@mui/icons-material/Highlight';

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";
function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useNavigate();
  function logout() {
    dispatch(authActions.logout());
    history("/signin"); // Redirect to signin page after logout
  }
  return (
    <header>
      <div className="left">
        <Link to={isLoggedIn ? "/note" : "/"}>
          <h1><HighlightIcon />Keeper</h1>
        </Link>
      </div>
      <div className="right">
        <Link className="button" to="/note">
          Note
        </Link>
        {!isLoggedIn && (
          <>
            <Link className="button" to="/signin">
              Sign In
            </Link>
            <Link className="button" to="/signup">
              SignUp
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <button className="button" onClick={logout}>
              LogOut
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
