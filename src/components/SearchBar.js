import React from 'react';
import { IconButton, Box, Toolbar } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import API_ENDPOINT from '../config';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const getAllBlogs = async () => {
            const res = await axios.get(`${API_ENDPOINT}/api/blog`)
                .catch(err => console.log(err))
            const data = await res.data;
            setFilteredData(
                data.blogs.filter((item) => {
                    return item.title.toLowerCase().includes(searchQuery.toLowerCase())
                }
                )
            );
        }
        getAllBlogs()
    }, [searchQuery]);

    return (
        <div>
            <Box marginLeft='240px'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                    </IconButton >
                    <Search>
                        <SearchIconWrapper >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Blog"
                            inputProps={{ 'aria-label': 'search' }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        />
                    </Search>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl()}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ m: 2 }} >
                            {filteredData.map((item, index) => (
                                <Box sx={{ p: 0.2 }} key={index}>
                                    <Link className='searchText' to={`/blog/${item._id}`} key={index}>
                                        <h3>{item.title}</h3>
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Popover>
                </Toolbar>
            </Box>
        </div>
    )
}

export default SearchBar;