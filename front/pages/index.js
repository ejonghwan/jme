import React, { useEffect } from 'react';
import Layout from '../components/Layout.js'
import PostForm from '../components/PostForm.js'
import PostCard from '../components/PostCard.js'

import { useSelector, useDispatch } from 'react-redux'
import { LOAD_POST_REQUEST } from '../reducers/post.js';



const index = () => {

    const dispatch = useDispatch();
    const { loginDone, me } = useSelector(state => state.user)
    const { mainPosts, infiniteLimit, loadPostLoading } = useSelector(state => state.post)
    const { loginLoading, logoutLoading } = useSelector(state => state.user)
    
    // console.log(me)

    useEffect(() => {
        if(infiniteLimit) {
            dispatch({ type: LOAD_POST_REQUEST })
        }
    }, [])


    useEffect(() => {
        // 스크롤 전체값 -500 < 현재 화면의 스크롤 탑값 + 현재 화면의 높이값 
        function infiniteScroll() {
            let bodyHeight = document.body.clientHeight;
            let currentVal = window.pageYOffset;
            let windowHeight = window.innerHeight;
            if(bodyHeight - 500 < currentVal + windowHeight && infiniteLimit && !loadPostLoading) {
                // console.log('^^')
                dispatch({ type: LOAD_POST_REQUEST })
            }
            console.log(infiniteLimit)
        }
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
        } 
    }, [infiniteLimit, loadPostLoading])
    
    return (
        <div>
            <Layout>
                {me && <PostForm /> }
                {loginLoading || logoutLoading? (
                    <div>...loading</div>
                ) : (
                    mainPosts.map(data => <PostCard key={data.id} data={data}/>)
                )}
            </Layout>
        </div>
    );
};

export default index;