import logo from './logo.svg';
import './App.css'; // this is for any styling --> any styling will happen in App.css

import React, { useState } from 'react'
import axios from 'axios'

import pumaLogo from './PUMA.jpg';

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
      <div className="top-bar">
        <h1 className="website-title">puma</h1> {/* Add a class for website title */}
        <div className="menu-icon">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div> {/* Add a div for the menu icon */}
      </div>
      {/*<img src={pumaLogo} alt="PUMA logo" className="pumaLogo"/>  {/* This is the logo. We can always change it but all the code is already in */} 
      <h2 className="title">Search a Class</h2> {/* Add a title class */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-bar" // Search-bar class here
      />
      <button className="search-button" onClick={handleSearch}>Search</button> {/* Add a class for button styling */}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
