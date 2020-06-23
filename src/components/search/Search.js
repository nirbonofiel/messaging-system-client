import React from 'react';
import './Search.scss';
import { FaSearch } from 'react-icons/fa';

const Search = (props) => {
  return (
    <div className="container search-container">
      <div className="container form-control">
        <FaSearch className="col-2" fontSize={16}></FaSearch>
        <input
          type="number"
          onChange={(event) => props.changeHandler(+event.target.value)}
          className="input-style col-10"
          placeholder="Enter sender or recevier id"
        />
      </div>
    </div>
  );
};

export default Search;
