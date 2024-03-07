import logo from './logo.svg';
import './App.css'; // this is for any styling --> any styling will happen in App.css

import React, { useState } from 'react'
import axios from 'axios'

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/search', { query });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="container"> {/* Add a container class */}
      <h1 className="title">Search a Class</h1> {/* Add a title class */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-bar" // Add the search-bar class here
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}


export default App;
