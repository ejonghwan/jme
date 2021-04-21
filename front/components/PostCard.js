import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ImageForm from './ImageForm.js'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import FollowButton from './FollowButton.js'
import PostCardContent from './PostCardContent.js'
import { removePost } from '../reducers/post'
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post'



const PostCard = ({ data }) => {
    // console.log(data.Images[0])

    const dispatch = useDispatch()

    const { me } = useSelector(state => state.user )
    const id = me && me.id
    
    const like = data.Likers.find(val => val.id === id) //data (mainPosts) 에 Likers에 내 아이디가 있으면 

    // const [like, setLike] = useState(false)
    const [comment, setComment] = useState(false)
    const handleToggle = useCallback(e => {
        if(e.target.name === 'comment') setComment(prev => !prev)
    })

    useEffect(() => {
        // console.log('data: ', data)
        console.log('id??:', id)
        console.log('me??:', me)
    }, [])

    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: data.id,
        })
    }, [])
    const onUnlike = useCallback(() => {
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: data.id,
        })
        // console.log(data.id) // 내가누른 게시글의 id를 보내줌
    }, [])


    const handleRemoveValue = e => {
        dispatch(removePost(data.id))
    }

    // useEffect(() => {
    //     console.log(id)
    // }, [id])
    

    return (
        <div>
            {data.Images[0] && <ImageForm data={data} />}
            <FollowButton data={data}/>
            <div>{data.User.nickname[0]}</div>
            <div>{data.User.nickname}</div>
            <div>{<PostCardContent data={data.content}/>}</div>
            <button>리트윗</button>
            {!like ? (
                <button name="like" onClick={onLike} style={{color: 'black'}}>좋아요</button>
            ) : (
                <button name="like" onClick={onUnlike} style={{color: 'red'}}>좋아요 취소</button>
            )}
            <button name="comment" onClick={handleToggle}>댓글펼치기</button>
            {id && data.User.id === id ? (
                <>
                    <button>수정</button>
                    <button onClick={handleRemoveValue}>삭제</button>
                </>
            ) : ( 
                <>
                    <button>신고</button>
                </>
            )}
            {comment && (
                <div>
                    <CommentForm data={data} />
                    <CommentList data={data} />
                </div>
                )}
            
        </div>
    );
};

export default PostCard;