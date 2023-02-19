import { Avatar, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINT from '../config';

const Auth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);

  const sendRequest = async (e) => {
    e.preventDefault();
    const type = isSignup ? "signup" : "login";

    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    
    const res = await axios.post(`${API_ENDPOINT}/api/user/${type}`, payload).catch(err => console.log(err))

    const data = await res.data;
    setUser(data.id);
    localStorage.setItem("auth", data.id)
    isSignup && (window.location.href = "/blogs");
  }
  const paperStyle = {
    padding: " 10px 60px 0 60px ",
    height: "64.5vh",
    width: 360,
    margin: "20px auto 130px auto"
  };

  const avatarStyle = { backgroundColor: "#129da1" };

  return (
    <div>
      {user && <Navigate to="/blogs" />}
      <form onSubmit={sendRequest} >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant='h4' padding={3} textAlign='center'>{isSignup ? "Singup" : "Login"}</Typography>
            </Grid>

            {isSignup && (<TextField
              label="UserName"
              placeholder="Enter Username"
              variant="standard"
              fullWidth
              required
              name="name" />)}
            <TextField
              label="Email"
              name="email"
              type={'email'}
              placeholder='email'
              variant="standard"
              fullWidth />
            <TextField
              label="Password"
              name="password"
              type={'password'}
              placeholder='password'
              variant="standard"
              fullWidth />
            <Button type='submit'
              variant='contained'
              sx={{ marginTop: 3, backgroundColor: '#00ADB5' }}
             fullWidth>Submit</Button>
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ marginTop: 3 }}>
              <Typography variant='h7' sx={{color:'black'}}>Don't have an account?</Typography>
              {isSignup ? "Login" : "Sing up"} </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  )
}

export default Auth;
