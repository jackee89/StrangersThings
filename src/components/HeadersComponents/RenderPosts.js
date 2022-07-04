import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { AddNewPost } from './AddNewPost';
import { fetchPosts } from '../../api/APIcalls';
import { MessageForm } from './SendMessageForm';

const RenderPosts = ({token, APIURL, username}) => { 
 

 
  const [posts, setPosts] = useState ([]);
  const [searchString, setSearchString] = useState ("");
  const [message, setMessage] = useState('')

  function postMatches(post, searchString) {

      let location=post.location.toLowerCase();
      let description=post.description.toLowerCase();
      let title=post.title.toLowerCase();
      let lowercaseString=searchString.toLowerCase();

      if (title.includes(lowercaseString) || description.includes(lowercaseString) || location.includes(lowercaseString)) {
        return true
      }
    }
  
  const filteredPosts = posts.filter(post => postMatches(post, searchString));
  const postsToDisplay = searchString.length ? filteredPosts : posts;
  
  async function fetchAllPosts() {
    try {
      await fetchPosts().then((results) => {setPosts(results)});
      
    } catch (error) {
      console.error(error);
    }}

    //still causing constant rendering?
  useEffect(()=>{
    fetchAllPosts ();
  }, [postsToDisplay]);

return <>
        <div>
          <form id='searchForm'>
            <label id='searchLabel'>Search Posts</label>
            <input id='searchInput' type="text" placeholder="enter searchwords..." autoComplete="off" value={searchString} 
              onChange={async (e) => {
                  setSearchString(e.target.value);
            }}>
            </input>
            <button>Search</button>
          </form>

          {token ?
          <BrowserRouter>
          <div id='buttondiv'>
            <button className='button' id='addButton' >
              <Link className='myPostsLinks' to="/newpost">Create New Post</Link>
            </button>
          </div>

            <div>
              <Route path="/newpost">
                <AddNewPost token={token}/>
              </Route>
            </div>
          </BrowserRouter>  : ''}
        </div>

        <div id="posts">{postsToDisplay.map((post, index)=> {

                return <div className="post" key={index}> 
                            <h2 className='boxTitle'> {post.title}</h2>
                            <p><b>Username:</b> {post.author.username}</p>
                            <p><b>Location:</b> {post.location}</p>
                            <p>{post.description}</p>
                            <p><b> Price</b>: {post.price}</p>
                            <p><b>Will Deliver: </b> {post.willDeliver ? <span>No</span>:<span>Yes</span>}</p>
                            {(token && (post.author.username !== username)) ? 
                            <BrowserRouter>
                               <button className='button' id='messageButton' >
                                    <Link className='myPostsLinks' to='/message'>Respond to Author</Link>
                                </button>
                                <div>
                                    <Route path='/message'>
                                      <MessageForm APIURL={APIURL} post_id={post._id} token={token} message={message} setMessage={setMessage}/>
                                    </Route> 
                                </div>
                            </BrowserRouter> : '' }
                      </div>
        })}
        </div>
      </>
}

export {RenderPosts}