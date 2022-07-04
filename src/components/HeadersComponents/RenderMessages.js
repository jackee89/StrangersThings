import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const RenderMessages = ({token, username, APIURL}) => {

  const [messages, setMessages] =useState([])



  let myInboxMessages= [];
  let mySentMessages= [];

  const fetchMyMessages = async (token) => {
      await fetch(`${APIURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      }).then(response => response.json())
        .then(result => {
            //console.log(result)
            console.log(`These are my messages: ${result.data.messages}`);
            setMessages(result.data.messages)  
        })
        .catch(console.error);
      };


  useEffect(()=>{
    fetchMyMessages(token);
  }, []);



  messages.map((message)=>{
    if( message.fromUser.username === username) {
      mySentMessages.push(message);
    } else {
      myInboxMessages.push(message);
    }
  })


    return <>
          <h3 className='inboxHeader'>Inbox</h3>
          <div>{myInboxMessages.map((message, index)=>{
            return <div className='message'key={index}>
                      <p className='boxTitle'>{message.fromUser.username}</p>
                      <p><b>Post: </b>{message.post.title}</p>
                      <p><b>Message: </b>{message.content}</p>
                      <Link to='/message'><button className='button'>Reply</button></Link>
                  </div>
          })}
          </div>

          <h3 className='inboxHeader'>Sent</h3>
          <div>{ mySentMessages.map((message, index)=>{
                return <div id="sentMessage" className='message' key={index}>
                          {/* <p>find a way to get username to display</p>  */}
                          <p className='boxTitle'>Post: {message.post.title}</p>
                          <p>{message.content}</p>
                          {/* <Link to='/message'><button className='button'>Send Another?</button></Link>  */}
                        </div>
          })}
          </div>
      </>
}

 export {RenderMessages}





