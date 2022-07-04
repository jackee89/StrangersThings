import React from "react";
import { Link } from "react-router-dom";

export const MessageForm = ({message, setMessage, post_id, token, APIURL }) => {

  //APIURL const not owrking here?
    const postMessages = async () => {
        fetch(`https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT/posts/${post_id}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      }).then(response => response.json())
        .then(result => {
          console.log(`This is the post message response ${result}`);
        })
        .catch(console.error);
        }


    return <form id='messageForm'>
            <label>Message: </label>
            <input type="text" placeholder="Type your message here" autoComplete='off' onChange={(e) => {
                  setMessage(e.target.value)}}>
            </input>
            <button classname='button' onClick={()=>{postMessages(); setMessage('')}}><Link className='myPostsLinks'to='/inbox'>Send</Link></button>
    </form> 
}