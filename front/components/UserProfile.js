import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { login_action, logout_action }from '../reducers/user.js'



const UserProfile = ({ setIsLoggedIn }) => {

    const dispatch = useDispatch()

    const handleLogout = useCallback(e => {
        e.preventDefault();
        // setIsLoggedIn(false)
        dispatch(logout_action())
    }, [])

    return (
        <div>
            <div>
                <span>avatar</span><br />
                <span>userName</span>
            </div>
            <ul>
                <li>num: <span>0</span></li>
                <li>followings: <span>0</span></li>
                <li>followers: <span>0</span></li>
            </ul>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default UserProfile;