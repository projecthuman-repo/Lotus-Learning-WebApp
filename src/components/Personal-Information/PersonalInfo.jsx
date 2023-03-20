import React from 'react'
import styled from 'styled-components'

const PersonalInfo = () => {
    return (
        <>
            <HeadingTitle>Personal Information ✎</HeadingTitle>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Email:</Key>
                        <Value placeholder='johndoe@gmail.com'></Value>
                    </InputRow>
                    <hr></hr>
                    <InputRow>
                        <Key>Phone Number:</Key>
                        <Value placeholder='XXX-XXX-XXX'></Value>
                    </InputRow>
                    <hr></hr>
                    <InputRow>
                        <Key>Gender</Key>
                        <Value placeholder='Male'></Value>
                    </InputRow>
                    <hr></hr>
                    <InputRow>
                        <Key>Country</Key>
                        <Value placeholder='Canada'></Value>
                    </InputRow>
                    <hr></hr>
                    <InputRow>
                        <Key>Province</Key>
                        <Value placeholder='Ontario'></Value>
                    </InputRow>
                </div>
            </InfoTable>
        </>
    )
}

export default PersonalInfo


const HeadingTitle = styled.h2`
    font-weight: 700;


`

const InfoTable = styled.div`
    border: 1px solid black;
    border-radius: 15px;

    margin: 2rem 0;

    width: 100%;

    display: flex;
    flex-direction: column;

    .table-border {
        padding: 2rem 2.5rem;
    }
`


const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    
    padding: 0;
    margin: 0;
`

const Key = styled.p`
    font-weight: 400;
    margin: 0;
`

const Value = styled.input`
    font-weight: 400;
    margin: 0;

    border: none;
`