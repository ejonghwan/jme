
import React from 'react';
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST, REMOVE_FOLLOW_REQUEST } from '../reducers/user';

const FollowingList = ({ header, data }) => {

    const dispatch = useDispatch();

    const followCancelClick = (data) => () => {
        if(header === "followings") {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data,
            })
        } else if(header === "followers") {
            dispatch({
                type: REMOVE_FOLLOW_REQUEST,
                data,
            })
        }
        
    }

    return (
        <div>
            {header}<br />
            <div>
                {data.map( item => {
                    // console.log('item: ', item)
                    return (
                        <li>
                            id: {item.id}<br />
                            nickname: {item.nickname}<br />
                            <button onClick={followCancelClick(item.id)}>삭제</button>
                        </li>
                    )
                })}
            </div>
            <div>더보기</div>
        </div>
    );
};

export default FollowingList;