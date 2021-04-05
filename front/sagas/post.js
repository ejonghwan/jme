import { all, call, delay, fork, put, takeLatest } from "@redux-saga/core/effects";
import Axios from 'axios'

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post'


function addpostAPI(data) {
    return Axios.get('/api/addpost', data)
}

function* addpost(action) {
    // const result = yield call(addpostAPI, action.data) 
    yield delay(1000)
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data,
            data: action.data,
        })
    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}