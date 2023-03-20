import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

const NotificationInfo = () => {

    return (
        <>
            <HeadingTitle>Notification Settings</HeadingTitle>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Learning Reminders</Key>
                        <Form.Check type='switch' />
                    </InputRow>
                </div>
            </InfoTable>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Set Reminder Time</Key>
                        <TimeSelector type={"time"}></TimeSelector>
                    </InputRow>
                </div>
            </InfoTable>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Email Notifications</Key>
                        <Form.Check type='switch' />
                    </InputRow>
                </div>
            </InfoTable>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>Sound Effects</Key>
                        <Form.Check type='switch' />
                    </InputRow>
                </div>
            </InfoTable>
            <InfoTable>
                <div className='table-border'>
                    <InputRow>
                        <Key>News and Announcements</Key>
                        <Form.Check type='switch' />
                    </InputRow>
                </div>
            </InfoTable>

        </>
    )
}

export default NotificationInfo


const HeadingTitle = styled.h2`
    font-weight: 700;


`

const InfoTable = styled.div`
    border: 1px solid #2699FB;
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

const Key = styled.h5`
    font-weight: 400;
    margin: 0;
`

const TimeSelector = styled.input`
    border: none;
`