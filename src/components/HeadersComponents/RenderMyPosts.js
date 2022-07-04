import React, {useState, useEffect} from "react";
import {  deletePost } from "../../api/APIcalls";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {EditPost} from "./EditPost"

const RenderMyPosts = ({token, APIURL}) => {

    const [myPosts, setMyPosts] = useState([]);

    
    //try to get this into API call area later
   async function fetchMyPosts() {
      await fetch(`${APIURL}/posts`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then(response => response.json())
          .then(result => {
            let myPostsArray=[];
           let posts= result.data.posts;
            posts.map((post) => {if (post.isAuthor === true) {myPostsArray.push(post)}})
           console.log(`This is an array of my posts: ${myPostsArray}`);
            setMyPosts(myPostsArray);
          })}
          useEffect(()=>{
            fetchMyPosts();
          }, [myPosts]);
    
  
    return <div id="posts">{myPosts.map((post, index)=>{
                  
        return(<div key={index} className="post">
                    <h2 className='boxTitle'> {post.title}</h2>
                    <p><b>Username:</b> {post.author.username}</p>
                    <p><b>Location:</b> {post.location}</p>
                    <p>{post.description}</p>
                    <p><b>Price:</b> {post.price}</p>
                    <p><b>Will Deliver:</b> {post.willDeliver ? <span>No</span>:<span>Yes</span>}</p>
                    <button className='button' onClick={async()=>{deletePost(token, post._id)}} >Delete</button> 
                    
                        <BrowserRouter>
                            <button className='button'>
                              <Link className='myPostsLinks' to="/editpost">Edit</Link>
                            </button>

                            <div>
                              <Route path="/editpost">
                                <EditPost token={token} postID={post._id} />
                              </Route>
                            </div>
                        </BrowserRouter>
                    
                </div>
    )})}
    </div>
}

export {RenderMyPosts}

