import React from 'react';
import './App.css';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';
import Auth from './components/Auth';
import BlogDetail from './components/BlogDetail'
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import AddBlog from './components/AddBlog';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import UpdateBlog from './components/UpdateBlog';

function App() {

  return <React.Fragment>
      <Header>
        <Header/>
      </Header>
      <main>
        <Routes>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/auth' element={<Auth/>} />
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/myblogs' element={<UserBlogs/>}/>
          <Route path='/blog/:id' element={<BlogDetail/>}/>
          <Route path='/blogs/add' element={<AddBlog/>}/>
          <Route path='/blog/page/:id' element={<BlogPage/>}/>
          <Route path='/update/:id' element={<UpdateBlog />} />
        </Routes>
      </main>
      <Footer>
        <Footer/>
      </Footer>
    </React.Fragment>
  ;
}

export default App;
