import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import API_ENDPOINT from '../config';

const BlogDetail = () => {
  const { id } = useParams("id");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const res = await axios.get(`${API_ENDPOINT}/api/blog/${id}`)
        .catch(err => console.log(err))
      const data = res.data;
      return data;
    }
    getBlog().then(data => (setBlog(data.blog)))
  }, [id])

  return (
    <div>
      <Card sx={{
            width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover": {
              boxShadow: "10px 10px 20px #ccc"
            }
          }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {blog.title}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={blog.title}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={blog.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {blog.description}
              </Typography>
            </CardContent>
          </Card>
    </div>
  )
}

export default BlogDetail