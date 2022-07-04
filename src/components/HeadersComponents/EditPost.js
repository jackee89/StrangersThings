import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { patchPost } from "../../api/APIcalls";


export const EditPost = ({token, postID}) => {
    let history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState (0.00);
    const [delivery, setDelivery] = useState (false);
    const [location, setLocation] = useState('On Request')

    
    async function updateUserPost() {
        try {
            await patchPost(token, postID, title, description, price, location, delivery)
        } catch (error) {
             console.error(error.message);
        }
    }

//try to make it so that either just the changed text updates or that everythign shows up and you can editall the text there?
    return (
        <div>
            <h3 id='editHeader'>Edit Your Post</h3>
            <form id="createPost" onSubmit={async(e)=>{
                    e.preventDefault();
                    updateUserPost();
                    history.push('/posts') 
            }}>
            <div className='editSection'>
                <label>Title: </label>
                <input type='text' autoComplete="off"  onChange={(e)=>{setTitle(e.target.value)}} ></input>
            </div>
            <div className='editSection'>
                <label>Description: </label>
                <input type='text' autoComplete="off"onChange={(e)=>{setDescription(e.target.value)}}  ></input>
            </div>
            <div className='editSection'>
                <label>Price: </label>
                <input type='text' autoComplete="off" onChange={(e)=>{setPrice(e.target.value)}} ></input>
            </div>
            <div className='editSection'>
                <label>Location: </label>
                <input type='text' autoComplete="off" onChange={(e)=>{setLocation(e.target.value)}} ></input>
            </div>
            <div className='editSection'>
                <label>Will Deliver? </label> 
                <select onChange={(e)=>{setDelivery(e.target.value)}}>
                    <option value={false} > Yes </option>
                    <option value={true}> No </option>
                </select> 
            </div>
            <button className='button' type="submit">Update</button>
            </form>
        </div>
    )}