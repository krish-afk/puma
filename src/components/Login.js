import './Login.css'
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
// import { useThemeProps } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login(props){
    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")
    const [error,setError]=useState(false)
    const history=useNavigate()
   
    const handleLogin=()=>{
        console.log(error)
        if(username==="" || password==="" ){
            setError(true)
        }
        else{
            let profile = {"username": username, "password": password}
            axios.post("https://puma-backend-1.onrender.com/students/authenticateUser", profile)
            .then(response => {
                setError(false)
                props.getUsername(username)
                history("/search")
            })
            .catch(e => {
                setError(true)
                console.log(e)
            })
        }
     
    }

    return <div className='Login-page'>
        <h3 className='heading-right'>Log in</h3>
        {error?<TextField error id="outlined-error" label="Enter a valid username" className="text-username" margin="normal" variant="outlined"  onChange={e=>setUsername(e.target.value)}/> : <TextField  id="usernameBox" label="Enter Username" variant="outlined"  className="text-username" margin="normal" onChange={e=>setUsername(e.target.value)}/>  }
        {error? <TextField error id="outlined-error" label="Enter a valid password" className="text-password" margin="normal" variant="outlined"  onChange={e=>setPassword(e.target.value)}/> : <TextField id="passwordBox" label="Enter Password" type="password" variant="outlined"  className="text-password" margin="normal" onChange={e=>setPassword(e.target.value)}/> }
        <br/>
        <button className="submit-log-in" onClick={handleLogin} id="loginBox">Log In</button>
        <span className='signup' id="signupNote">Don't have an account? <a id="signupLink" href="" onClick={props.onRegisterChange}> Sign up</a> </span>
    </div>
}

