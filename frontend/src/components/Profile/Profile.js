import React from "react";
import AuthService from "../../service/auth.service";

import "./Profile.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header>
        <h1>
          <strong>You are logged in as {currentUser.email}</strong>
        </h1>
      </header>
      <p>
        <strong>Your id :</strong> {currentUser.id}
      </p>
    </div>
  );
};

export default Profile;
