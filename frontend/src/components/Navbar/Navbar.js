import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../service/auth.service";
import EventBus from "../../check/EventBus";
import logo from "../../assets/icon.png";
import "./Navbar.css";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="Navbar">
        <div className="Logo">
          <Link to="/">
            <img src={logo} alt="Logo" width="50px" height="auto" />
          </Link>
        </div>
        <div className="Navbar__links">
          {currentUser && (
            <li className="Navbar__item">
              <Link to="posts">Read the posts</Link>
              <Link to="add">Add a post</Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="Navbar__links">
            <li>
              <Link to="profile" onClick={AuthService.remove}>
                Delete Account
              </Link>
            </li>
            <li className="Navbar__item">
              <a href="/login" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="Navbar__links">
            <li className="Navbar__item">
              <Link to="login">Login</Link>
            </li>

            <li className="Navbar__item">
              <Link to="register">SignUp</Link>
            </li>
          </div>
        )}
      </nav>

      {/*<AuthVerify logOut={logOut}/>*/}
    </div>
  );
};

export default Navbar;
