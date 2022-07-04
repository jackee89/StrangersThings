//make this an accessable variable for whole document....
const APIURL = 'https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT'

const FetchNewToken = async (username, password, setToken) => {

        await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json'
             },
            body: JSON.stringify({
            user: {
                 username: username,
                password: password
            }
        })
        }).then(response => response.json())
        .then(result => {
              setToken(result.data.token);
              console.log(`The token: ${result.data.token}`)
             
        })
            .catch(console.error);
    }
    

    const CheckForToken = async (username, password, setToken) => {
       await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: username,
                password: password
                }
            })
            }).then(response => response.json())
            .then(result => {
                setToken(result.data.token);
                console.log(`The token: ${result.data.token}`)
            })
            .catch(console.error);
    }

    export {FetchNewToken, CheckForToken};