// post/[id].js

import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

const PostId = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector( state => state.post )

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch({
        //     type: LOAD_POST_REQUEST,
        //     data: id,
        // })
        console.log('asd: ', singlePost)
    }, [])
    

    return (
        <div>
            {id}
            
            {singlePost ? (
                <>
                    nickanme: {singlePost.User.nickname} <br />
                    content: {singlePost.content} <br /> 
                </>
            ) : (
                <div>유저가 없습니다</div>
            )}
           

        </div>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start')

    const cookie = context.req ? context.req.headers.cookie : ''; 
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie; 
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })

    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,  //context.params.id 하거나 context.query.id 하면 [id]에 접근가능
    })
  
    console.log('server side props end')
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})


export default PostId;