import './Signup.css'
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
    return <div className='Signup-page'>
        <h1 className='heading-right'><b>Welcome! Sign Up</b></h1>
        <TextField id="outlined-basic" label="Create Username" variant="outlined"  className="text-username" margin="normal"/>
        <TextField id="outlined-basic" label="Create Password" type="password" variant="outlined"  className="text-password" margin="normal"/> 
        <Button className = "file-button" component="label" role={undefined} variant="outlined" tabIndex={-1}> Upload file
        <VisuallyHiddenInput type="file" /> </Button>
        <Link to="/search"><button className="submit-sign-up" >Sign Up</button></Link>
        <br/>
        <span className='login'>Already registered? <a href="" onClick={props.onRegisterChange} >Sign in </a> </span>
    </div>
}

