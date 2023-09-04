import React from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, LogIn } from "react-feather";

const Header = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          <img
            src="images/maccabi-chat-logo.svg"
            className="maccabi--chat--logo"
          ></img>
          Welcome {user.name}
          <i title="Logout">
            <LogOut
              className="header--link logout--icon"
              onClick={handleLogout}
            />
          </i>
        </>
      ) : (
        <>
          <Link to="/">
            <LogIn className="header--link" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
