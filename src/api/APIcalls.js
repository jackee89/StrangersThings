//make this an accessable link
const APIURL = 'https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT'

export const fetchPosts = async () => {
        
        try {
        const response = await fetch(`${APIURL}/posts`)
        const results = await response.json();
        const posts = results.data.posts
        if (results.error) throw results.error; 
        console.log(`This is all of the posts: ${posts}`)
        return posts;
        } catch (err) {
          console.error(err.messages);
        }
    }

 export const fetchUserPosts = async (token) => {
    await fetch(`${APIURL}/posts`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
          let myPostsArray=[];
          //console.log(result);
          let posts = result.data.posts;
         //return result.data.posts;
           posts.map((post) => {if (post.isAuthor === true) {myPostsArray.push(post)}})
          console.log(`This is an array of my posts: ${myPostsArray}`)
           return myPostsArray;
        })
        .catch(console.error);

}

export const fetchMessages = async (token) => {

        await fetch(`${APIURL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        }).then(response => response.json())
          .then(result => {
            console.log(result)
              console.log(`This should access all of my messages: ${result.data.messages}`);
          })
          .catch(console.error);
        };




 export const postRequest = async (token, title, description, price, location, delivery) => {
        try{
          await fetch('https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT/posts', {
              method: "POST",
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
           },
          body: JSON.stringify({
            post: {
              title: title,
              description: description,
              price: price,
              location: location,
              willDeliver: delivery
            }
          })
        }).then(response => response.json())
          .then(result => {
            console.log(`Return of Message Post Request ${result}`);
          })
      } catch(error) {
          console.log(error.message)
      } 
      };


      
export const deletePost = async (token, postID) => {
    fetch(`${APIURL}/posts/${postID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then(response => response.json())
        .then(result => {
            console.log(`Return of Post Delete Request ${result}`);
        })
        .catch(console.error);
}

export const patchPost = async (token, postID, title, description, price, location, delivery) => {
  fetch(`${APIURL}/posts/${postID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          location: location,
          willDeliver: delivery
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log(`Return of Post Edit Request ${result}`);
      })
  .catch(console.error);

}