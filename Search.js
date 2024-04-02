import './Search.css';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {grey} from '@mui/material/colors';
import "@fontsource/league-spartan/800.css";
import { PropaneSharp } from '@mui/icons-material';
import {Link} from 'react-router-dom'
/* for menu icon */
import MenuIcon from '@mui/icons-material/Menu'; 
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';



export default function Search(props){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSearch = async () => {
    try {
     // const response = await axios.post('/search', { query });
      setResults('');
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="container">
      {/* Button moved to top right */}
      <div className="menuLink">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className="menuButton"
        >
          {/* Square shape with "Menu" text */}
          <Typography variant="button" style={{ color: 'white', fontSize: '25px'}}>Menu</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>My classes</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      {/* Original component */}
      <img src="../../Puma.png" className="pumaLogo" />
      <h2 className="title">Search a Class</h2>
      <div className="search-div">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Lookup a class..."
          className="search-bar"
        />
        <Link to="/map">
          <button className="searchIcon" onClick={handleSearch}>
            <SearchIcon sx={{ color: grey[50] }} fontSize="large" />
          </button>
        </Link>
      </div>
    </div>
  );
}