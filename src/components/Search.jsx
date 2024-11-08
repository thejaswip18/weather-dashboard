import React, { useState } from 'react';
import "../css/Search.css"

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
