import React from 'react'
import styles from '../../Styles'

const BasicTextInput = ({placeholder = '', id = '' , password = false, setValueTo, value, extraClassName = ''}) => {
  return (
    <input placeholder={placeholder} type={password? 'password' : 'text'} onChange={(e) => setValueTo(e.target.value)} value={value} className={`${styles.simple_text_input} ${extraClassName} border`}/>
  )
}

export default BasicTextInput