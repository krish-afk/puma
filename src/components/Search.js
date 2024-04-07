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

    // Mocked options for autocomplete --> based off Fall 2024 classes
  const options = ['CICS110', 'CICS160', 'CICS208', 'CICS210', 'CICS237', 'CICS256', 'CICS291T', 'CICS298A', 'CICS305', 'CICS580', 'CS119', 'CS198C', 'CS220', 'CS230',  'CS240', 'CS250', 'CS311', 'CS320', 'CS325', 'CS326', 
                  'CS328', 'CS335', 'CS345', 'CS363', 'CS377', 'CS383', 'CS410', 'CS420', 'CS429', 'CS445', 'CS446', 'CS453', 'CS461', 'CS490Q', 'CS514', 'CS515', 'CS520', 'CS528', 'CS532', 'CS560', 'CS563', 'CS575', 'CS589',
                  'CS590X', 'CS596E', 'CS602', 'CS610', 'CS611', 'CS646', 'CS646', 'CS648', 'CS653', 'CS655', 'CS660', 'CS661', 'CS666', 'CS670', 'CS677', 'CS682', 'CS685', 'CS687', 'CS688', 'CS689', 'CS690K', 'CS692P', 'CS692X', 'CS698W']
  // For filtering the search --> doesn't work yet 
  const filteredOptions = options.filter(option => {
    const searchParts = query.toLowerCase().split(' ').filter(part => part.trim() !== ''); // Split search query by spaces and filter out empty parts
    return searchParts.every(part =>
      option.toLowerCase().includes(part)
    );
  });
  
  return (
    <div className="container">
      <CustomMenu />
      <img src="../../Puma.png" className="pumaLogo" alt="Puma Logo" />
      <h2 className="title">Search a Class</h2>
      <form
        action="/map"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = '/map';
        }}
      >
        <div className="search-div">
          <Autocomplete
            options={filteredOptions}
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
                  style: { fontSize: 16, width: 500 }
                }}
              />
            )}
          />
          <Link to="/map" className="search-link">
            <button type="submit" className="search-button" onClick={handleSearch}>
              <SearchIcon className="search-icon" style={{ fontSize: 40 }} />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
