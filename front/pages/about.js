import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_USER_REQUEST } from '../reducers/user'

const About = () => {

    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
            // userId: 11
        })
    }, [])

    return (
        <div>
            {me.map(item => {
                return (
                    <div>
                        nickname: {item.nickname}<br />
                        followings: {item.Followings.length}<br />
                        followers: {item.Followers.length}<br />
                    </div>
                )
            })}
        </div>
    );
};

export default About;