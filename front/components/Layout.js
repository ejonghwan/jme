import React, { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

import styles from "./Layout.module.css"
import UserProfile from './userProfile.js'
import LoginForm from './loginForm.js'

const Layout = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)


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
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
                </div>
            </div>
            
        </div>
    );
};


Layout.propTypes = {
    children: PropTypes.node.isRequired,   
}


export default Layout;