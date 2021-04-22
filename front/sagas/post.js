
import { all, call, delay, fork, put, takeLatest } from "@redux-saga/core/effects";
import axios from 'axios'

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, 
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    generaterDummyPost,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
    
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user'


function randomKey() {
    return Math.random().toString(36).substr(2)
}

function addpostAPI(data) {
    return axios.post('/post', { content: data })
}

function* addpost(action) {
    const result = yield call(addpostAPI, action.data) 
    // yield delay(1000)
    // const id = randomKey()
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
            // data: {
            //     id,
            //     content: action.data,
            // }

        })

        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })

    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}/delete`) //delete는 두번째 인자에 data 못넣음. 요청패스에 넣으몀ㄴ 됨 ㅎㅎ
}

function* removePost(action) {
    
    try {
        const result = yield call(removePostAPI, action.data)
        // yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            // data: action.data, 
            data: result.data,
        })

        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        })
    } catch(err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: action.error
        })
    }
}


function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data) // post/post/1/comment
}

function* addComment(action) {
    // yield delay(1000)
    try {
        console.log('asdasdasd!!!!!', action.data)
        const result = yield call(addCommentAPI, action.data) 
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
            // data: action.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}


function loadPostAPI(data) {
    return axios.get('/posts', data)
}

function* loadPost(action) {
    // yield delay(1000);
    try {
        const result = yield call(loadPostAPI, action.data) 
        yield put({
            type: LOAD_POST_SUCCESS,
            // data: generaterDummyPost(10)
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data
        })
    }
}

function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`) //데이터는 인자로 안넣어도 됨. 요청에 있기 때문에 post/:postId/like 로 가져올수있음. req.params.postId 
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data
        })
    }
}

function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/unlike`)
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.error
        })
    }
}





function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addpost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchloadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function* watchlikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchunlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}



export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchloadPost),
        fork(watchlikePost),
        fork(watchunlikePost),
    ])
}