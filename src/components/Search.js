import './Search.css';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import CustomMenu from './Menu.js'; // Import CustomMenu component

export default function Search(props) {
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
    <div className="container">
      {/* CustomMenu component */}
      <CustomMenu />
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
