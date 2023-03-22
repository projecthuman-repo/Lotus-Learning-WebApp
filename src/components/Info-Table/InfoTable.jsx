import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const InfoTable = () => {
    return (
        <TableOutline>
            <div className='table-border'>
                <InputRow>
                    <Key>Q: Lorem ipsum dolor sit amet, consectetur adipiscing</Key>
                    <Dropdown>
                        <Dropdown.Toggle split variant="success" id="dropdown-split-primary" />
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </InputRow>
            </div>
        </TableOutline>
    )
}

export default InfoTable

const TableOutline = styled.div`
    border: 1px solid black;
    border-radius: 10px;

    width: 100%;

    display: flex;
    flex-direction: column;

    margin: 1rem 0;

    .table-border {
        padding: 1.2rem 1rem;
    }
`

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0;
    margin: 0;
`

const Key = styled.p`
    font-weight: 400;
    margin: 0;
`

