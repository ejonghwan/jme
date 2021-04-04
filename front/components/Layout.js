import React, { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

// import { initalState } from '../reducers/index'
import { useSelector } from 'react-redux'

import styles from "./Layout.module.css"
import UserProfile from './UserProfile.js'
import LoginForm from './Loginform.js'



const Layout = ({ children }) => {

    const { me } = useSelector(state => state.user)
    
    return (
        <div>
            <div>
                <Link href="/"><a>home</a></Link>
                <Link href="/profile"><a>profile</a></Link>
                <Link href="/signup"><a>signup</a></Link>
                <input type="text" />
                <button>search</button>
            </div>
            <div className={styles.contents}>
                <div>
                <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">naver test</a>
                </div>
                <div>
                    {children}
                </div>
                <div>
                    {me ? <UserProfile /> : <LoginForm />}
                </div>
            </div>
            
        </div>
    );
};


// Layout.propTypes = {
//     children: PropTypes.node.isRequired,   
// }


export default Layout;