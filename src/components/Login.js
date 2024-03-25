import './Login.css'
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import { useThemeProps } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export default function Login(props){
    return <div className='Login-page'>
        <h3 className='heading-right'>Log in</h3>
        <TextField id="outlined-basic" label="Enter Username" variant="outlined"  className="text-username" margin="normal"/>
        <TextField id="outlined-basic" label="Enter Password" type="password" variant="outlined"  className="text-password" margin="normal"/> 
        <br/>
       <span className='forgot-password'> <a  href="" >Forgot your Password?</a> </span>
        <Link to="/search"><button className="submit-log-in">Log In</button></Link>
        <span className='signup'>Don't have an account? <a  href="" onClick={props.onRegisterChange}> Sign up</a> </span>
    </div>
}