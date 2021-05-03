import React, { useEffect } from 'react';
import Layout from '../components/Layout.js'
import NicknameEditForm from '../components/NicknameEditForm.js'
import FollowList from '../components/FollowList.js'

import Router from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga' 

const Profile = () => {

    // const followers = [{nick:'jj'}, {nick:'jj1'}, {nick:'jj2'}]
    // const followings = [{nick:'hh'}, {nick:'hh'}, {nick:'hh'}]

    const dispatch = useDispatch()
    const { me } = useSelector(state => state.user)
    

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        })

        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        })
    }, [])

    useEffect(() => {
        if(!(me)) {
            Router.push('/')
        }
    }, [me])
    
    // useEffect(() => {
    //     if(!(me && me.id)) {
    //         Router.push('/')
    //     }
    // }, [me && me.id])

    if(!me) {
        return null;
    };

    return (
        <div>
            <Layout>
                <NicknameEditForm />
                <FollowList header="followings" data={me.Followings} />
                <FollowList header="followers" data={me.Followers} />
            </Layout>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start')
    // console.log('콘텍스트야!:', context)

    const cookie = context.req ? context.req.headers.cookie : ''; 
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie; 
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })
  
    console.log('server side props end')
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})

export default Profile;