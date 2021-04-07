import React, { useEffect } from 'react';
import Layout from '../components/Layout.js'
import NicknameEditForm from '../components/NicknameEditForm.js'
import FollowingList from '../components/FollowingList.js'
import FollowerList from '../components/FollowerList.js'

import Router from 'next/router'

import { useSelector } from 'react-redux'

const Profile = () => {

    // const followers = [{nick:'jj'}, {nick:'jj1'}, {nick:'jj2'}]
    // const followings = [{nick:'hh'}, {nick:'hh'}, {nick:'hh'}]

    const { me } = useSelector(state => state.user)

    // useEffect(() => {
    //     if(!(me && me.id)) {
    //         Router.push('/')
    //     }
    // }, [me && me.id])
    
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
                <FollowingList header="following" data={me.Followings} />
                <FollowerList header="followers" data={me.Followers} />
            </Layout>
        </div>
    );
};

export default Profile;