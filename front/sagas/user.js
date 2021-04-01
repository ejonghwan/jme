import { all, put, takeLatest, takeEvery, throttle, fork, delay,  } from "@redux-saga/core/effects";
import Axios from 'axios'



function loginAPI(data) {
    return Axios.post('/api/login', data)
}

function* login(action) {
    // const result = yield call(loginAPI, action.data)
    yield delay(1000)
    try {
        yield put({
            type: "LOGIN_SUCCESS",
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: "LOGIN_FAILURE",
            data: err.response.data,
        })
    } 

}

function logoutAPI(data) {
    return Axios.post('/api/logout', data)
}

function* logout(action) {
    // const result = call(logoutAPI, action.data)
    yield delay(1000)
    try {
        yield put({
            type: "LOGOUT_SUCCESS",
            // result: result.data,
        })
    } catch(err) {
        yield put({
            type: "LOGOUT_FAILURE",
            data: err.response.data,
        })
    }
}

// 여기서 받는 request 액션에 실어오는 payload가 login함수에 action으로 전달함 그래서 거기서 type data를 받아올 수 있음
function* watchLogin() { 
    yield takeLatest("LOGIN_REQUEST", login)
}

function* watchLogout() {
    yield takeLatest("LOGOUT_REQUEST", logout)
}

export default function* userSaga () {
    yield all([
        fork(watchLogin),
        fork(watchLogout)
    ]);
}