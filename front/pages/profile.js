import React from 'react';
import Layout from '../components/Layout.js'
import NicknameEditForm from '../components/NicknameEditForm.js'
import FollowingList from '../components/FollowingList.js'
import FollowerList from '../components/FollowerList.js'

const Profile = () => {

    const followers = [{nick:'jj'}, {nick:'jj1'}, {nick:'jj2'}]
    const followings = [{nick:'hh'}, {nick:'hh'}, {nick:'hh'}]

    return (
        <div>
            <Layout>
                <NicknameEditForm />
                <FollowingList header="following" data={followings} />
                <FollowerList header="followers" data={followers} />
            </Layout>
        </div>
    );
};

export default Profile;