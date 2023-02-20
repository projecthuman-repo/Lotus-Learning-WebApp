
import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


// Defining a functional component -> SearchBar
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");


  //This function is called when Input value changes 
  //Updates the value of the search term state variable 
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

  //Return 
    return (
      <div className="center">
        <h1 className="title">Course Catalogue</h1>
        {/* added a div to put the button and form in, using that to set the border and etc*/}
        <div className="tBox">
          <div className="search-icon">
            <FontAwesomeIcon icon={faSearch}/>
          </div>
        <form>
          <input
            type="text"
            className="SearchInput"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          ></input>
          <button type="submit" className="button">Search</button>
        </form>
        </div>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    );
  };


// Add logic to handle the form submission here, such as making an API call to fetch the search results
  // Example -> make an API call with searchTerm value
  // and update the state with results of the API call 
  // console.log("Search Term:", searchTerm);


  //Export -> can be used in other parts of the app
  export default SearchBar;
