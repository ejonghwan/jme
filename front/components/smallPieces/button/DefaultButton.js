import React from 'react'
import styles from './Button.module.css'

const DefaultButton = ({value}) => {
    return (
        <button className={styles.default}>
            {value}
        </button>
    )  
}

export default DefaultButton;