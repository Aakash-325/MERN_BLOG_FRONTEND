import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box, Link } from '@mui/material';
import { red } from '@mui/material/colors';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import API_ENDPOINT from '../config';

const UserBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get(`${API_ENDPOINT}/api/blog/user/${user}`)
        .catch(err => console.log(err))
      const data = res.data;
      return data;
    }
    getAllBlogs().then(data => setBlogs(data.blogs.blogs))
  }, [user])

  // const UpdateBlog = async (id) => {
  //   const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`)
  //     .catch(err => console.log(err))
  //   const data = res.data;
  //   return data;
  // }

  // const handleEdit = (id) => {
  //   UpdateBlog(id).then(data => console.log(data))
  // }

  const deleteBlog = async (id) => {
    const res = await axios.delete(`${API_ENDPOINT}/api/blog/delete/${id}`)
      .catch(err => console.log(err))
    const data = res.data;
    return data;
  }

  const handleDelete = (id) => {
    deleteBlog(id).then(data => console.log(data))
  }

  return (
    <div>
      {blogs && blogs.map((blog, index) =>
        <div key={index}>
          <Card sx={{
            width: '40%', margin: 'auto', mt: 2, mb: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover": {
              boxShadow: "10px 10px 20px #ccc"
            }
          }}>
            {user && (
              <Box display='flex' justifyContent="flex-end">
                <Link href={`/update/${blog._id}`} >
                  <IconButton sx={{ marginLeft: 'auto' }}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(blog._id)} >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            )}
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {blog.title.slice(0, 1)}
                </Avatar>
              }
              title={blog.title}
            // subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="280"
              image={blog.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {blog.description.slice(0, 180)}<Link underline="none" href={`/blog/page/${blog._id}`}>read more .. </Link>
              </Typography>
            </CardContent>
          </Card>
        </div>)}
    </div>
  )
}

export default UserBlogs;