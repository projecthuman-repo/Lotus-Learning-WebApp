import React from 'react';
import { BiSearch } from 'react-icons/bi';

const Searchbar = () => {
  return (
    <div className='input-group search-bar mb-3 border border-2'>
      <span className='input-group-text search-icon border-0'>
        <BiSearch size={25} />
      </span>

      <input type='text' className='form-control search-input border-0' />
      <span className='input-group-text border-0'>Search</span>
    </div>
  );
};

export default Searchbar;
