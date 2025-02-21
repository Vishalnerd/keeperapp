import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  function logout() {
    dispatch(authActions.logout());
    history("/signin"); // Redirect to signin page after logout
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header>
      <div className="left">
        <Link to={isLoggedIn ? "/note" : "/"}>
          <h1>Keeper</h1>
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <nav className={menuOpen ? "nav-open" : ""}>
        <div className="right">
          {isLoggedIn && (
            <>
              <span className="user-name">Hello, {user.username}</span>
              <Link className="button" to="/note">
                Note
              </Link>
              <button className="button" onClick={logout}>
                LogOut
              </button>
            </>
          )}
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
        </div>
      </nav>
    </header>
  );
}

export default Header;
