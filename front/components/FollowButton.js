import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ data }) => {


    const [follow, setFollow] = useState(false)
    // console.log(data)
    const dispatch = useDispatch()
    const { me } = useSelector(state => state.user)


    const followClick = e => {
        e.preventDefault()
        
        if(me.Followings.find(val => val.id === data.id)) {
            setFollow(false)
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: { id: data.id }
            })
        } else {
            setFollow(true)
            dispatch({
                type: FOLLOW_REQUEST,
                data: { id: data.id }
            })
        }
        
    }

    if(me.id === data.User.id) {
        return null
    }
  


    return (
        <div>
            {me && <>
                {follow ? (
                    <div><a href="" onClick={followClick}>unfollow</a></div>
                ): (
                    <div><a href="" onClick={followClick}>follow</a></div>
                )}
            </>
            }
           
        </div>
    );
};

export default FollowButton;