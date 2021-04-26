

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, UPLOAD_IMAGES_REQUEST } from '../reducers/post'

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


    const onChangeImages = useCallback((e) => {
        console.log('images: ', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (file) => { //e.target.files 가 유사배열이라 array에 call
            imageFormData.append('image', file); //append에 키: 'image'  값: file. 서버에 upload.array('image')랑 일치하게끔 해야됨.
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })

    }, [])


    useEffect(() => {
        if(addPostDone) setPost('');
    }, [addPostDone]);

    return (
        <div>
            postFrom
            <form onSubmit={handleChangeSubmit} encType="multipart/form-data">
                <textarea placeholder="ing..." value={post} onChange={handleChangePost}></textarea>   
                <button type="submit">submit</button>
                
                <input type="file" name="image" hidden multiple ref={imgUpload} onChange={onChangeImages} />
                <a href="#" onClick={handleImgUpload}>file upload</a>
            </form>
        </div>
    );
};

export default PostForm;