import { all, call, delay, fork, put, takeLatest } from "@redux-saga/core/effects";
import Axios from 'axios'

function addpostAPI(data) {
    return Axios.get('/api/addpost', data)
}

function* addpost(action) {
    // const result = yield call(addpostAPI, action.data) 
    yield delay(1000)
    try {
        yield put({
            type: "ADD_POST_SUCCESS",
            // data: result.data,
        })
    } catch(err) {
        yield put({
            type: "ADD_POST_FAILURE",
            data: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield takeLatest("ADD_POST_REQUEST", addpost)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost)
    ])
}