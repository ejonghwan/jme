import React from 'react';
import "./_global.css"
import PropTypes from 'prop-types'
import Head from 'next/head'
import wrapper from '../store/configureStore.js'

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


export default wrapper.withRedux(App);