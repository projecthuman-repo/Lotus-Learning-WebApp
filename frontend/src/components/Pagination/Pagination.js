import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

/**
 * The `Pagination` component is a reusable component in JavaScript that handles pagination logic and
 * rendering using the ReactPaginate library.
 * @returns The Pagination component is returning a ReactPaginate component with various props and
 * classNames.
 */
const Pagination = ({ itemsPerPage, items, handleSetCurrentPageItems }) => {
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    handleSetCurrentPageItems(itemOffset, endOffset);
  }, [itemOffset]);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <ReactPaginate
      nextLabel='Next Page'
      previousLabel='Previous Page'
      pageRangeDisplayed={5}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      renderOnZeroPageCount={null}
      breakLabel='...'
      containerClassName='d-flex '
      previousClassName='mx-4 page-item'
      previousLinkClassName='c-gray'
      nextClassName='mx-4 page-item'
      nextLinkClassName='text-decoration-underline'
      pageClassName='mx-2 page-item'
      pageLinkClassName='c-gray'
      activeLinkClassName='c-black'
    />
  );
};

export default Pagination;
