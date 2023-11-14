import React from 'react';

const Search = ({ searchTerm, onInputChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className='searchSect'>
      <input
        type='text'
        placeholder='Search for a blog'
        value={searchTerm}
        onChange={onInputChange}
        onClick={handleKeyPress}
      />
      <button style={{marginLeft:15, paddingLeft:15, paddingRight:15, borderRadius:5}} onClick={onSearch}>Search</button>
    </div>
  );
};

export default Search;
