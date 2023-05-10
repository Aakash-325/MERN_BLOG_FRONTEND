import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  return (
    <AppBar position='sticky' style={{ backgroundColor: '#00ADB5' }}>
      <Toolbar >
        <Typography variant='h4'>
          AnimeKayo
        </Typography>
        <Box display="flex" marginLeft={'auto'} marginRight={'auto'} >
          <Tabs textColor='inherit' value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: 'white' } }}
            aria-label="secondary tabs example">
            <Tab className='AllBlog' value="one" LinkComponent={Link} sx={{ mt: 1 }} to="/blogs" label="All Post" />
            {user && (
              <Tab value="two" LinkComponent={Link} sx={{ mt: 1 }} to="/myblogs" label="My post" />
            )}
            {user && (
              <Tab value="three" LinkComponent={Link} sx={{ mt: 1 }} to="/blogs/add" label="Add post" />
            )}
          </Tabs>
          <SearchBar />
        </Box>
        <Box display='flex' marginLeft='Auto'>
          {!user ? (
            <>
              <Button LinkComponent={Link} to="/auth"
                style={{ backgroundColor: '#39AEA9' }}
                variant='contained' sx={{ margin: 1, borderRadius: 2 }}  >Login</Button>
              <Button LinkComponent={Link} to="/auth"
                style={{ backgroundColor: '#39AEA9' }}
                variant='contained' sx={{ margin: 1, borderRadius: 2 }} >Singup</Button>
            </>
          ) : (
            <Button onClick={logout}
              style={{ backgroundColor: '#39AEA9' }}
              variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;