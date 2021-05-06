import React from 'react';
import { useRouter } from 'next/router'

const test1 = () => {

    const router = useRouter();
    const { test1 } = router.query
    console.log(router.query)

    return (
        <div>
            test?? {test1}
        </div>
    );
};

export default test1;