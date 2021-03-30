import React, { useCallback, useState } from 'react';

const CommentForm = ({ data }) => {

    const [comment, setComment] = useState('')
    const handleComment = useCallback(e => {
        setComment(e.target.value)
    }, [])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        console.log(data.User.id, comment)
    }, [comment])

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