import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar, InputLabel, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import API_ENDPOINT from '../config';

  const UpdateBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get(`${API_ENDPOINT}/api/blog/${id}`)
                .catch(err => console.log(err))
            const data = res.data;
            return data;
        }
        getBlog().then(data => (setBlog(data.blog)))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${API_ENDPOINT}/api/blog/update/${id}`, {
          title: e.target.title.value,
          description: e.target.description.value,
          image: e.target.image.value
        }).catch(err => console.log(err));
        window.location.href = '/myblogs'
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBlog({
            [name]: value
        })
    }

    const paperStyle = {
        padding: " 10px 80px 0 80px ",
        height: "64.5vh",
        width: 500,
        margin: "20px auto 130px auto"
      };
    
    const avatarStyle = { backgroundColor: "#129da1" };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align="center">
                            <Avatar style={avatarStyle}>
                                <AddPhotoAlternateIcon />
                            </Avatar>
                        </Grid>
                        <Typography fontWeight={400} padding={3} variant='h4' textAlign={'center'} >Update Blog</Typography>

                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Title</InputLabel>
                        <TextField name='title' variant="standard" placeholder='title' value={blog.title} onChange={handleChange} fullWidth required />
                        
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Description</InputLabel>
                        <TextField name='description' variant="standard" placeholder='description' value={blog.description} onChange={handleChange} fullWidth required />
                        
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>ImageURL</InputLabel>
                        <TextField name='image' variant="standard" placeholder='paste link here' value={blog.image} onChange={handleChange} fullWidth required />
                        
                        <Button sx={{ mt: 2, backgroundColor: '#00ADB5' }} variant='contained' type='submit' fullWidth>Submit</Button>
                    </Paper>
                </Grid>
            </form>
        </>
    )
}

export default UpdateBlog