import React from 'react'
import SerchButton from '../button/SerchButton'
import styles from './Input.module.css'


const SerchForm = ({width}) => {
    return (
        <div style={{width: width + 'px'}} className={styles.serch_form}>
            <input type="text" />
            <div className={styles.serch_btn}>
                <SerchButton type={"serch_type2"} value={"검색"} />
            </div>
        </div>
    )
}

export default SerchForm;