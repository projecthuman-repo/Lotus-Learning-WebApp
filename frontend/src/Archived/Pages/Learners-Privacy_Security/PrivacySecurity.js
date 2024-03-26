import './PrivacySecurity.css';
import React from 'react';
import styled from 'styled-components';
import LearnersProfileTemplate from '../Learners-Profile-Template/Learners-Profile-Template';

function SecurityInfo() {
  return (
    <>
      <div className='profileInfo'>
        <div>
          <HeadingTitle>Two Factor Authentication ✎</HeadingTitle>
          <InfoTable>
            <div className='table-border'>
              <InputRow>
                <Key>Email:</Key>
                <Value placeholder='johndoe@gmail.com'></Value>
              </InputRow>
              <hr></hr>
              <InputRow>
                <Key>Secondary Email:</Key>
                <Value placeholder='johndoe2@gmail.com'></Value>
              </InputRow>
              <hr></hr>
              <InputRow>
                <Key>Phone Number:</Key>
                <Value placeholder='XXX-XXX-XXX'></Value>
              </InputRow>
            </div>
          </InfoTable>
        </div>
        <div>
          <HeadingTitle>Billing Information ✎</HeadingTitle>
          <InfoTable>
            <div className='table-border'>
              <InputRow>
                <Key>Payment Method:</Key>
                <Value placeholder='johndoe@gmail.com'></Value>
              </InputRow>
              <hr></hr>
              <InputRow>
                <Key>Billing Address:</Key>
                <Value placeholder='00-10000 Random, Address X1V 3T4'></Value>
              </InputRow>
            </div>
          </InfoTable>
        </div>
      </div>
    </>
  );
}

export default function PrivacySecurity() {
  return (
    <>
      <LearnersProfileTemplate childComponent={SecurityInfo} />
    </>
  );
}

const HeadingTitle = styled.h2`
  font-weight: 700;
  text-align: left;
`;

const InfoTable = styled.div`
  border: 1px solid black;
  border-radius: 15px;

  margin: 2rem 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .table-border {
    padding: 2rem 2.5rem;
  }
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  padding: 0;
  margin: 0;
`;

const Key = styled.p`
  font-weight: 400;
  margin: 0;
`;

const Value = styled.input`
  font-weight: 400;
  margin: 0;

  border: none;
`;
