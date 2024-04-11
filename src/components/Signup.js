import './Signup.css'
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

 
export default function SignUp(props){
    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")
    const [error,setError]=useState(false)
    const history=useNavigate()

    const handleSignup=()=>{
        console.log(error)
        if(username=="" || password=="" ){
            setError(true)
        }
        else{
            //send to DB
            let profile = {"Username": username, "Password": password, "SpireID": "33848292"}
            axios.post("https://puma-backend-1.onrender.com/createUser", profile)
            .then(response => 
                {setError(false)
                history("/search")
            })
            .catch(e=> console.log(e))
        }
     
    }
    
    return <div className='Signup-page'>
        <h1 className='heading-right'><b>Welcome! Sign Up</b></h1>
        {error?<TextField error id="outlined-error" label="Enter a valid username" className="text-username" margin="normal" variant="outlined"  onChange={e=>setUsername(e.target.value)}/> : <TextField  id="outlined-basic" label="Enter Username" variant="outlined"  className="text-username" margin="normal" onChange={e=>setUsername(e.target.value)}/>  }
        {error? <TextField error id="outlined-error" label="Enter a valid password" className="text-password" margin="normal" variant="outlined"  onChange={e=>setPassword(e.target.value)}/> : <TextField id="outlined-basic" label="Enter Password" type="password" variant="outlined"  className="text-password" margin="normal" onChange={e=>setPassword(e.target.value)}/> }
        <Button className = "file-button" component="label" role={undefined} variant="outlined" tabIndex={-1}> Upload file
        <VisuallyHiddenInput type="file" /> </Button>
        <button className="submit-sign-up" onClick={handleSignup} >Sign Up</button>
        <br/>
        <span className='login'>Already registered? <a href="" onClick={props.onRegisterChange} >Sign in </a> </span>
    </div>
}

