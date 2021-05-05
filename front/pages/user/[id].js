
import React, { useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'

import { LOAD_USER_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user'
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post'



// 특정 사용자의 정보와 게시물만 가져오는거 구현해보기
const User = () => {

    const dispatch = useDispatch();
    const { mainPosts, infiniteLimit, loadUserPostsLoading, postInfo } = useSelector(state => state.post)

    const router = useRouter();
    const { id } = router.query;

    
    

    useEffect(() => {
        function scroll() {
            const bodyHeight = document.body.clientHeight;
            const currentHeight = window.pageYOffset;
            const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id
            if(bodyHeight - 100 < currentHeight + window.innerHeight && infiniteLimit && !loadUserPostsLoading) {
                console.log('?왜안댐')
                dispatch({
                    type: LOAD_USER_POSTS_REQUEST,
                    lastId: lastId,
                    data: id
                })
            }
        }
        window.addEventListener('scroll', scroll)
        return function() {
            window.removeEventListener('scroll', scroll)
        }
    }, [mainPosts, infiniteLimit, loadUserPostsLoading, id])

    useEffect(() => {
        console.log('asdasd:', id)
        console.log('asdasd:', postInfo)
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id
        })
        dispatch({
            type: LOAD_USER_REQUEST,
            data: id
        })
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    }, [id])

    return (
        <div style={{height: "2000px;"}}>user{id}
            {postInfo && postInfo.map(item => {
                 <>
                    {item.content}<br />
                    {item.Followers}<br />
                    {item.Followings}<br />
                    {item.Posts}<br />
                </>
            })}
        </div>
    )
}

export default User;