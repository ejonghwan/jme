import { all, put, takeLatest, takeEvery, throttle, fork, delay, call } from "@redux-saga/core/effects";
import Axios from 'axios'

import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    LOGOUT_SUCCESS, LOGOUT_FAILURE,LOGOUT_REQUEST,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SiGNUP_FAILURE,  
    FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
    UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS,
} from '../reducers/user'



function loginAPI(data) {
    return Axios.post('/api/login', data)
}

function* login(action) {
    // const result = yield call(loginAPI, action.data)
    yield delay(1000)
    try {
        yield put({
            type: LOGIN_SUCCESS,
            // data: result.data
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            error: err.response.data,
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
            type: LOGOUT_SUCCESS,
            // result: result.data,
        })
        
    } catch(err) {
        yield put({
            type: LOGOUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signupAPI(data) {
    return Axios.post('http://localhost:3060/user', data)
}


function* singup(action) {
    const result = yield call(signupAPI, action.data)
    console.log(result)
    // yield delay(1000)
    try {
        yield put({
            type: SIGNUP_SUCCESS,
            // result: result.data,
        })
    } catch(err) {
        yield put({
            type: SiGNUP_FAILURE,
            error: err.response.data,
        })
    }
}


function* follow(action) {
    yield delay(1000);
    try {
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }
}


function* unfollow(action) {
    yield delay(1000);
    try {
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }
}

// 여기서 받는 request 액션에 실어오는 payload가 login함수에 action으로 전달함 그래서 거기서 type data를 받아올 수 있음
function* watchLogin() { 
    yield takeLatest(LOGIN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function* signupLogout() {
    yield takeLatest(SIGNUP_REQUEST, singup)
}

function* watchfollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchunfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga () {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(signupLogout),
        fork(watchfollow),
        fork(watchunfollow),
    ]);
}