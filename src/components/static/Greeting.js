import React, { useState, useEffect } from "react";

const Name = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    //gets user stored info
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userLists = JSON.parse(localStorage.getItem("users"));
    console.log("LogggedInUser", loggedInUser);
    console.log("UserLists", userLists);
    console.log("LogggedInUser Email: ", loggedInUser.email);

    //finds the user and set its name
    userLists.forEach((user) => {
      if (user.email === loggedInUser.email) {
        setName(user.name);
      }
    });
  }, []);

  return (
    <div className="main-header">
      <p className="app-name">
        Dae<span>bank</span>
      </p>
      <p className="greet-user">
        Welcome back, <span>{name}</span>!
      </p>
    </div>
  );
};

export default Name;
