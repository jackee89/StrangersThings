
import React from "react";
import {FetchNewToken, CheckForToken} from "../api/LoginAPIcalls";
import { useHistory } from "react-router-dom";

const Login = ({setToken, username, password, setUsername, setPassword}) => {
    let history = useHistory();
 
    return (
        <form  id='loginForm'onSubmit={(e) => {
            e.preventDefault(); 
            CheckForToken (username, password, setToken);
            
          }}>
              <h1>Every Good Friend Was Once A Stranger</h1>
            <lb />
                  <h2> Register or Login to start posting!</h2>
                 
            <div>
                <label>Username: </label>
                <input type='text'  onChange={(e) => {setUsername(e.target.value)}}></input>
            </div>
            <div>
                <label>Password: </label>
                <input type='password' onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <div id='loginButtons'>
           
                <button type="submit">Login</button>

                <button  onClick={()=>{
                    (username && password) ? (FetchNewToken(username, password, setToken) && history.push("/")) : <h1>Login Credentials Required</h1>
                }}>Sign Up</button>

            </div>
        </form>
    )
}

export {Login}