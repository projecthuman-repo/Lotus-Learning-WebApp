import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header-Components/Logged-In/Header-Logged-In';
import SideNav from '../../Archived/Components/Side-Nav-bar/Side-Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from 'react-bootstrap';
import InfoTable from '../../components/Info-Table/InfoTable';
import './Learners-Help.css';
const LearnersHelp = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header></Header>
      <SplitRow>
        <SplitCol className='sideNav'>
          <SideNav></SideNav>
        </SplitCol>
        <SplitCol>
          <HelpHeader>
            HELP CENTER
            <SearchBox>
              <div className='search-field'>
                <FontAwesomeIcon className='icon-search' icon={faSearch} />
                <SearchInput
                  type={'text'}
                  placeholder='search...'
                ></SearchInput>
              </div>
              <SearchButton>Search</SearchButton>
            </SearchBox>
          </HelpHeader>
          <SplitCol className='faq-content'>
            <HeadingTitle>Frequently Asked Questions</HeadingTitle>
            <SplitRow>
              <SplitCol className='question-list'>
                <InfoTable></InfoTable>
                <InfoTable></InfoTable>
                <InfoTable></InfoTable>
                <InfoTable></InfoTable>
                <InfoTable></InfoTable>
              </SplitCol>
              <div className='alternate-search-row'>
                {/* <SplitCol className='alternate-search-col'>Can't Find An Answer?</SplitCol> */}
                <p>Can't Find An Answer?</p>
                <p>Contact Us</p>
                <p>email@projecthumancity.com</p>

                <p>Operations</p>
                <p>email@projecthumancity.com</p>
                <p>###-###-####</p>
              </div>
            </SplitRow>
          </SplitCol>
        </SplitCol>
      </SplitRow>
    </>
  );
};

export default LearnersHelp;

const SplitRow = styled.div`
  display: flex;
  flex-direction: row;

  .content-section {
    margin: 3rem 0.5rem 1rem 3rem;
  }

  .alternate-search-row {
    margin: 1rem 0;
  }
`;

const SplitCol = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #f3f3f3;

  .faq-content {
    justify-content: space-evenly;
    padding: 2rem 0.5rem 0.5rem 3rem;
  }

  .question-list {
    padding: 0;
    margin: 0;
  }
`;

const HelpHeader = styled.div`
  background-color: grey;

  width: 100%;
  height: 20rem;
  color: white;

  font-size: 2rem;
  font-weight: 700;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;

  width: 40rem;

  color: grey;
  background-color: white;

  border: 1px solid #b3b3b3;
  border-radius: 15px;

  .search-field {
    display: flex;
    flex-direction: row;
  }

  .icon-search {
    font-size: 25px;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
`;

const SearchButton = styled.button`
  background-color: #ededed;
  color: #b3b3b3;

  font-size: 1rem;

  border: none;
  border-radius: 0 15px 15px 0;

  padding: 0.5rem 1rem;
`;

const SearchInput = styled.input`
  font-size: 1.5rem;
  border: none;

  width: 31.9rem;
`;

const HeadingTitle = styled.h2`
  font-weight: 700;
`;
