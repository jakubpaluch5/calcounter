import "./secretstyle.css";
import React from "react";
import { useAuth } from "./context/auth";

function Secret(props) {
    const { setAuthTokens } = useAuth();
  
    function logOut() {
      setAuthTokens();
    }
  
    return (
      <div className="redsc">
        <p>Secret</p>
        <button onClick={logOut}>Log out</button>
      </div>
    );
  }
  
  export default Secret;