

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_USER_REQUEST } from '../reducers/user'

const About = () => {

    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch()
    console.log(userInfo)
    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
            data: 11
        })
        
    }, [])

    return (
        <div>
            {userInfo &&
                (
                    <div>
                        nickname: {userInfo.nickname}<br />
                        followings: {userInfo.Followings.length}<br />
                        followers: {userInfo.Followers.length}<br />
                    </div>
                )
            }
        </div>
    );
};

export default About;