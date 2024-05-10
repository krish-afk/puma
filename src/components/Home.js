import './Home.css';
import Grid from '@mui/material/Grid';
import Image from './image';
import Login from './Login'
import SignUp from './Signup';
import "@fontsource/baloo-thambi-2"; 
import "@fontsource/baloo-thambi-2/800.css"; 
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function Home({onQuery}) {
  const [registered, setRegistered]= useState(true)

  const handleRegisterChange =(e)=>{
    e.preventDefault()
    setRegistered(!registered)
  }

  const handleInput=(username)=>{
    // e.preventDefault()
    onQuery(username)
  }
                                                 
  return (
    <div className="Home">
    <Grid container spacing={1}>
      <Grid xs={6}>
        <div className='div-left'>
        <Image/>
        </div>
      </Grid>
      <Grid xs={6}>
        <div className='div-right'>
          {registered? <Login onRegisterChange={handleRegisterChange} getUsername={handleInput} />: <SignUp onRegisterChange={handleRegisterChange} registerVal={registered} />}
        </div>
      </Grid>
    </Grid>
    </div>
    
  );
}

export default Home;
