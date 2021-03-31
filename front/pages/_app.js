import React from 'react';
import "./_global.css"
import PropTypes from 'prop-types'
import Head from 'next/head'
import wrapper from '../store/configureStore.js'

//saga
import withReduxSaga from 'next-redux-saga'

import "swiper/swiper.scss";
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


const App = ({ Component }) => {
    return (
        <div>
            <Head>
                <title>jme</title>
            </Head>
            <Component />
        </div>
    );
};


App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}


export default wrapper.withRedux(withReduxSaga(App));