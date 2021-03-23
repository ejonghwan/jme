import React, { useCallback } from 'react';

const UserProfile = ({ setIsLoggedIn }) => {

    const handleLogout = useCallback(e => {
        e.preventDefault();
        setIsLoggedIn(false)
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