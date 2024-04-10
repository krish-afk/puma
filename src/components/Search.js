import './Search.css';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {grey} from '@mui/material/colors';
import "@fontsource/league-spartan/800.css";
import { PropaneSharp } from '@mui/icons-material';
import {Link} from 'react-router-dom'

export default function Search(props){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
     // const response = await axios.post('/search', { query });
      setResults('');
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
    return (
        <div className="container"> {/* Add a container class */}
          <div className="top-bar">
            <div className="menu-icon">
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </div> {/* Add a div for the menu icon */}
          </div>
          <img src='../../Puma.png' className="pumaLogo"/>  
          <h2 className="title">Search a Class</h2> {/* Add a title class */}
          <div className='search-div'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Lookup a class..."
            className="search-bar" // Search-bar class here
          />
         <Link to='/map'><button className='searchIcon' onClick={props.handleSearch}><SearchIcon sx={{color: grey[50]}} fontSize='large'/></button></Link>
          </div>
         
        </div>
      );
}
