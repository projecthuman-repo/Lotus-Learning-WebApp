import React from 'react'
import styled from 'styled-components'

const PreferencesInfo = () => {
    return (
        <>
            <HeadingTitle>Preferences</HeadingTitle>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Language </Key>
                        <Value>
                            <option value="0">Select Language:</option>
                            <option value="1">English(US)</option>
                            <option value="2">English(UK)</option>
                            <option value="3">Spanish</option>
                            <option value="4">French</option>
                            <option value="5">Mandarin</option>
                        </Value>
                    </InputRow>
                </div>
            </InfoTable>
        </>
    )
}

export default PreferencesInfo;


const HeadingTitle = styled.h2`
    font-weight: 700;
    text-align:left;


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

const Value = styled.select`
    font-weight: 400;
    margin: 0;

    border: none;
`