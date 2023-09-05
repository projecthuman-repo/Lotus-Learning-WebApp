import React from 'react';

//The FilterSidebar component renders a sidebar with filter options and buttons for clearing and
//searching and is used in the courses and games pages.

const FilterSidebar = ({ filterSidebarProps }) => {
  return (
    <div className='border border-2 bor-lightGray rounded p-2 p-sm-3'>
      <p>{filterSidebarProps.title}</p>

      {filterSidebarProps.filters.map((filter, index) => {
        return (
          <div key={index + filter.filterTitle}>
            <hr />
            <div>
              <p>{filter.filterTitle}</p>
              {filter.filterOptions.map((filterOption, index) => {
                return (
                  <div className='form-check my-2' key={index + filterOption}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={filterOption}
                      id={filterOption}
                    />
                    <label
                      className='form-check-label fs-14'
                      htmlFor={filterOption}
                    >
                      {filterOption}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className='d-sm-flex justify-content-center mt-4 text-center'>
        <button className='btn btn-gray-shadow fs-14 mx-auto'>Clear</button>
        <button className='btn btn-gray-shadow fs-14 mx-auto my-3 my-sm-0'>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
