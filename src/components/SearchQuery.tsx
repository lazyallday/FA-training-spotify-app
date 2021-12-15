import React, { useState } from 'react';

interface SearchQueryProps {
  onSearch: (query: string) => void
}

function SearchQuery(props: SearchQueryProps) {
  const [query, setQuery] = useState('');

  const onInputChange = (value: React.SetStateAction<string>) => {
    setQuery(value)
  }

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter' && query) {
      props.onSearch(event.target.value)
    }
  };

  const handleClick = () => {
    if (query) {
      props.onSearch(query)
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type to search for artists and press Enter to search"
        onChange={event => onInputChange(event.target.value)}
        onKeyUp={handleKeyUp}
      />
      <div className="input-group-append">
        <button
          onClick={handleClick}
          className="btn btn-outline-primary"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchQuery;