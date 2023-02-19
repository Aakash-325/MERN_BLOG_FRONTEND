import axios from 'axios';
import React from 'react';
import { Avatar, InputLabel, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import API_ENDPOINT from '../config';

const AddBlog = () => {
  const { user } = useContext(AuthContext);

  const sendRequest = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_ENDPOINT}/api/blog/add`, {
      title: e.target.title.value,
      description: e.target.description.value,
      image: e.target.imageURL.value,
      user: user
    }).catch(err => console.log(err));
    const data = res.data;
    window.location.href = '/myblogs'
    return data;
  }

  const paperStyle = {
    padding: " 10px 80px 0 80px ",
    height: "64.5vh",
    width: 500,
    margin: "20px auto 130px auto"
  };

  const avatarStyle = { backgroundColor: "#129da1" };

  return (
    <div>
      {!user && (window.location.href = "/blogs")}
      <form onSubmit={sendRequest}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AddPhotoAlternateIcon />
              </Avatar>
            </Grid>
            <Typography fontWeight={400} padding={3} variant='h4' textAlign={'center'} >Post your Blog</Typography>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Title</InputLabel>
            <TextField name='title' variant="standard" placeholder='title' fullWidth required />
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Description</InputLabel>
            <TextField name='description' variant="standard" placeholder='description' fullWidth required />
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>ImageURL</InputLabel>
            <TextField name='imageURL' variant="standard" placeholder='paste link here' fullWidth required />
            <Button sx={{ mt: 2 ,backgroundColor: '#00ADB5'}} variant='contained' type='submit' fullWidth>Submit</Button>
          </Paper>
        </Grid>
      </form>
    </div>
  )
}

export default AddBlog;