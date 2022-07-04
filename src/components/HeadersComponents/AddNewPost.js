import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../api/APIcalls";

const AddNewPost =  ({token}) => {
  
  let history = useHistory();

//try adding in state object later
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState (0.00);
  const [delivery, setDelivery] = useState (false);
  const [location, setLocation] = useState ('On Request')

  const postNewPost= async ()=>{ 
    try{
      await postRequest(token, title, description, price, location, delivery).then((results)=>{console.log(`Return of Message Post Request ${results}`)})
    } catch(error) {
      console.log(error.message)
     }
  }

  return (
    <div id='addContainer'>
        <h2>Create Your Post</h2>
        <form id="createPost" onSubmit={async(e)=>{
                    e.preventDefault();
                    postNewPost();
                    history.push("/");
            }}>
           <div>
              <label>Title: </label>
              <input type='text' autoComplete="off" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            </div>
            <div>
              <label>Description: </label>
              <input type='text' autoComplete="off" value={description} onChange={(e)=> setDescription(e.target.value)}></input>
            </div>
            <div>
              <label>Price: </label>
              <input type='text' autoComplete="off" value={price} onChange={(e)=> setPrice(e.target.value)}></input>
            </div>
            <div>
              <label>Location: </label>
              <input type='text' autoComplete="off" value={location} onChange={(e)=> setLocation(e.target.value)}></input>
            </div>
            <div>
              <label>Will Deliver? </label> 
              <select onChange={(e)=>{setDelivery(e.target.value)}}>
                   <option value={true}> Yes </option>
                   <option value={false}> No </option>
              </select> 
            </div>
            <button className='button' type="submit">Add</button>
        </form>
    </div>
    )


}

export {AddNewPost}


