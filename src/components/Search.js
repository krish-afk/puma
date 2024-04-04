import './Search.css';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import CustomMenu from './Menu.js'; // Import CustomMenu component
import Autocomplete from '@mui/material/Autocomplete'; // import Autocomplete component
import TextField from '@mui/material/TextField'; // Import TextField component


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
    try {
      console.log('Search query:', query)
    } catch (error) {
      console.error('Error searching;', error)
    }
  };


  // Mocked options for autocomplete
  const options = ['CS 220', 'CS 240', 'CS 250']

  return (
    <div className="container">
      {/* CustomMenu component */}
      <CustomMenu />
      {/* Original component */}
      <img src="../../Puma.png" className="pumaLogo" />
      <h2 className="title">Search a Class</h2>
      <form
        action="/map"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          // Navigate to /map when form is submitted
          window.location.href = '/map';
        }}
      >
        <div className="search-div">
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Lookup a class..."
                className="search-bar"
                
                InputProps={{
                  ...params.InputProps,
                  style: { fontSize: 16,  width: 500 } // Adjust the font size and padding
                }}
              />
            )}
          />
          <Link to="/map" className="search-link">
            <button type="submit" className="search-button" onClick={handleSearch}>
              <SearchIcon className="search-icon" style={{ fontSize: 40 }}/>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
