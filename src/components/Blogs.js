import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import {Link} from '@mui/material';
import API_ENDPOINT from '../config';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get(`${API_ENDPOINT}/api/blog`)
        .catch(err => console.log(err))
      const data = res.data;
      return data;
    }
    getAllBlogs().then(data => (setBlogs(data.blogs)))
  }, [])
  
  return (
    <div >
      {blogs && blogs.map((blog, index) =>
        <div key={index}>
          <Card sx={{
            width: '40%', margin: 'auto', mt: 2,mb:2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover": {
              boxShadow: "10px 10px 20px #ccc"
            }
          }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {blog.title.slice(0,1)}
                </Avatar>
              }
              title={blog.title}
            />
            <CardMedia onClick={()=>navigate(`/blog/page/${blog._id}`)}
              component="img"
              height="280"
              image={blog.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {blog.description.slice(0, 180)} <Link underline="none" href={`/blog/page/${blog._id}`}>read more .. </Link>
              </Typography>
            </CardContent>
          </Card>
        </div>)}
    </div>
  )
}

export default Blogs;