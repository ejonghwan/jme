

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post'

const PostForm = () => {

    const { addPostDone } = useSelector(state => state.post);

    const [post, setPost] = useState('')
    const handleChangePost = useCallback(e => {
        setPost(e.target.value);
    }, []);

    const imgUpload = useRef();
    const handleImgUpload = useCallback(e => {
        imgUpload.current.click();
    }, [imgUpload.current]);

    const dispatch = useDispatch();
    const handleChangeSubmit = useCallback(e => {
        e.preventDefault();
        dispatch(addPost(post));
        
    }, [post]); 

    useEffect(() => {
        if(addPostDone) setPost('');
    }, [addPostDone]);

    return (
        <div>
            postFrom
            <form onSubmit={handleChangeSubmit}>
                <textarea placeholder="ing..." value={post} onChange={handleChangePost}></textarea>   
                <button type="submit">submit</button>
                
                <input type="file" hidden multiple ref={imgUpload}/>
                <a href="#" onClick={handleImgUpload}>file upload</a>
            </form>
        </div>
    );
};

export default PostForm;