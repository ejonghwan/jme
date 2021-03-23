import React from 'react';
import "./_global.css"
import PropTypes from 'prop-types'
import Head from 'next/head'

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


export default App;