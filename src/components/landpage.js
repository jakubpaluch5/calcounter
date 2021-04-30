import React, { useState } from 'react';
import "./landpage.css";
import { TextField, Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "./context/auth";


    
function Landing(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    let referer;
    if(props.location.state !== undefined) {
        referer = props.location.state.referer;
    } else {
        referer = "/";
    }
    function postLogin() {
        
        
      axios.post("http://localhost/api/login.php", {
        login,
        password
    }).then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      }).catch(e => {
        setIsError(true);
      });
    }
    
    if (isLoggedIn) {
      return <Redirect to="/secret" />;
    }
  
    return (
     
    
    
    
    <div className="land-container">    
                <div className="sign-in-container animate__animated animate__fadeInRight">
                    <div className="center-container">
                        <h3>Zaloguj się!</h3>
                        <div className="form-container">
                            <form Validate autoComplete="off" onSubmit={postLogin}>
                                
                                <TextField
                                    id="outlined-basic"
                                    value={login}
                                    onChange={e => {
                                      setLogin(e.target.value);
                                    }}
                                    label="Login..." type="text" name="login" 
                                    variant="outlined" 
                                />
                                  <br></br><br></br>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Password..."
                                    type="password" 
                                    name="password" 
                                    onChange={e => {
                                        setPassword(e.target.value);
                                      }}
                                    variant="outlined" 
                                />
                                    <br></br><br></br>
                                <Button className="submit-button" style={{fontSize: "15px"}}  variant="contained" type="submit" color="secondary">Zaloguj</Button><br></br><br></br>
                                
                            </form>
                            <p>Nie masz konta?<Link to="/register" style={{color: "rose", cursor: "pointer", fontWeight: "bold", textDecoration: "none"}}> Kliknij tutaj</Link> aby je szybko założyć.</p>
                            { isError && <p>The username or password provided were incorrect!</p> }
                        </div>
                    </div>
                </div>
              </div>
    
    );
  }
  
  export default Landing;