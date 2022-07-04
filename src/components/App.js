import React, {useState} from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RenderPosts } from "./HeadersComponents/RenderPosts";
import {RenderMessages} from "./HeadersComponents/RenderMessages"
import { RenderMyPosts } from "./HeadersComponents/RenderMyPosts";
import { Login } from "./login";

 const MakeHeaders = () => {
    const APIURL = 'https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT'
    const [token, setToken] = useState ('');
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    //in future, try obejct state

    function LogOut () {
        setUsername('')
        setPassword('')
        setToken(null)
        console.log('user has logged out')
    }

    return (
        <BrowserRouter>
        <div id="header">
            <h1>Stranger's Things</h1>
            <div id='headerLinks'>
             {token ? "": <Link className="link" to='/login'>Login</Link>}
                <Link className="link" to='/'>Home</Link>
            {token ? 
                <span>
                    <Link className="link" to="/inbox">Inbox</Link> 
                    <Link className="link" to="/posts">Posts</Link> 
                    <Link className='link' to='/' onClick={()=>{LogOut()}}>LogOut</Link>
                </span> : ""}
            </div>
        </div>      
        <div>
            <Route exact path="/">
                <RenderPosts token={token} APIURL={APIURL} username={username} />
            </Route>
            <Route path="/inbox">
                <RenderMessages APIURL={APIURL} username={username} token={token}/>
            </Route> 
           
            <Route path="/posts">
                <RenderMyPosts APIURL={APIURL} token={token}/>
            </Route> 
            <Route path='/login'>
                {token ? <RenderPosts token={token} /> :
                <Login token={token} setToken={setToken} password={password} username={username} setPassword={setPassword} setUsername={setUsername}/>}
            </Route> 
        </div>
        </BrowserRouter>)
}


export {MakeHeaders};

  

