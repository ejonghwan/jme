import React from 'react';
import Layout from '../components/Layout.js'
import PostForm from '../components/PostForm.js'
import PostCard from '../components/PostCard.js'

import { useSelector } from 'react-redux'



const index = () => {

    const { isLoggedIn } = useSelector(state => state.user)
    const { mainPosts } = useSelector(state => state.post)

    return (
        <div>
            <Layout>
                {isLoggedIn && <PostForm /> }
                {mainPosts.map(data => <PostCard key={data.id} data={data}/>)}
            </Layout>
        </div>
    );
};

export default index;