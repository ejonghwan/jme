import React, { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post';
const CommentForm = ({ data }) => {


    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    const handleComment = useCallback(e => {
        setComment(e.target.value)
    }, [])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        // console.log(data.User.id, comment)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: comment, postId: post.id, userId: id}
        })
    }, [comment, id])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="댓글입력해주세요" value={comment} onChange={handleComment}></input>
                <button type="submit">comment</button>
            </form>
        </div>
    );
};

export default CommentForm;