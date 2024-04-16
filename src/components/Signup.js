import './Signup.css';
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

export default function SignUp(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null); // State to hold the selected file
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file
    };

    const handleSignup = async () => {
        if (username === "" || password === "") {
            setError(true);
        } else {
            try {
                // Send to DB
                let profile = {"Username": username, "Password": password, "SpireID": "33848292"};
                await axios.post("https://puma-backend-1.onrender.com/createUser", profile);
                
                // Upload the transcript if a file is selected
                if (file) {
                    const formData = new FormData();
                    formData.append('username', username);
                    formData.append('file', file);
                    await axios.post('https://puma-backend-1.onrender.com/transcripts/uploadTranscript', formData);
                }
    
                setError(false);
                navigate("/search");
            } catch (e) {
                console.log(e);
                setError(true);
            }
        }
    };
    

    return <div className='Signup-page'>
        <h1 className='heading-right'><b>Welcome! Sign Up</b></h1>
        {error ? <TextField error label="Enter a valid username" className="text-username" margin="normal" variant="outlined" onChange={e => setUsername(e.target.value)}/> : <TextField label="Enter Username" variant="outlined" className="text-username" margin="normal" onChange={e => setUsername(e.target.value)}/> }
        {error ? <TextField error label="Enter a valid password" className="text-password" margin="normal" variant="outlined" onChange={e => setPassword(e.target.value)}/> : <TextField label="Enter Password" type="password" variant="outlined" className="text-password" margin="normal" onChange={e => setPassword(e.target.value)}/> }
        <Button className="file-button" component="label" role={undefined} variant="outlined" tabIndex={-1}>
            Upload PDF Transcript
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        <button className="submit-sign-up" onClick={handleSignup}>Sign Up</button>
        <br/>
       <span className='login'>Already registered? <a href="" onClick={props.onRegisterChange} >Sign in </a> </span>
    </div>;
}


