
import { all, call, delay, fork, put, takeLatest } from "@redux-saga/core/effects";
import Axios from 'axios'

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST,
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user'


function randomKey() {
    return Math.random().toString(36).substr(2)
}

function addpostAPI(data) {
    return Axios.get('/api/addpost', data)
}


function* addpost(action) {
    // const result = yield call(addpostAPI, action.data) 
    yield delay(1000)
    const id = randomKey()
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data,
            data: {
                id,
                content: action.data,
            }
        })

        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        })

    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* removePost(action) {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    try {
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data, 
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



function* addComment(action) {
    // const result = yield call(addpostAPI, action.data) 
    yield delay(1000)
    try {
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: result.data,
            data: action.data,
        })
    } catch(err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        
    ])
}