import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardMedia } from "@mui/material";
import API_ENDPOINT from "../config";

const BlogPage = () => {
  const { id } = useParams();

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

  console.log(id)
  const paperStyle = {
    padding: " 10px 80px 40px 80px ",
    height: "2000",
    width: 800,
    margin: "20px auto 20px auto"
  };
  return (
    <div className="container">
      <Grid>
        <Paper className="paperSize" elevation={10} style={paperStyle}>
          <Grid align="center">
            <br />
            <h1 className="BlogTitle">{blog.title}</h1>
            <br />
            <br />
            <CardMedia
              component="img"
              height="400"
              image={blog.image}
              alt="Paella dish"
            />
            <br />
            <br />
            <p className="BlogText">
              {blog.description}
            </p>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default BlogPage;
