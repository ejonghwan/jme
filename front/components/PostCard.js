import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ImageForm from './ImageForm.js'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import PostCardContent from './PostCardContent.js'
import { removePost } from '../reducers/post'


const PostCard = ({ data }) => {
    // console.log(data.Images[0])

    const dispatch = useDispatch()

    const { me } = useSelector(state => state.user )
    const id = me && me.userId
    
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState(false)
    const handleToggle = useCallback(e => {
        if(e.target.name === 'like') setLike(prev => !prev)
        if(e.target.name === 'comment') setComment(prev => !prev)
    })


    const handleRemoveValue = e => {
        dispatch(removePost(data.id))
    }

    // useEffect(() => {
    //     console.log(id)
    // }, [id])
    

    return (
        <div>
            {data.Images[0] && <ImageForm data={data} />}
            <div>{data.User.nickname[0]}</div>
            <div>{data.User.nickname}</div>
            <div>{<PostCardContent data={data.content}/>}</div>
            <button>리트윗</button>
            {like ? (
                <button name="like" onClick={handleToggle} style={{color: 'black'}}>좋아요</button>
            ) : (
                <button name="like" onClick={handleToggle} style={{color: 'red'}}>좋아요</button>
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