
import { all, put, takeLatest, takeEvery, throttle, fork, delay, call } from "@redux-saga/core/effects";
import axios from 'axios'

import { 
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    LOGOUT_SUCCESS, LOGOUT_FAILURE,LOGOUT_REQUEST,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SiGNUP_FAILURE,  
    FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
    UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_SUCCESS,
} from '../reducers/user'


function myinfoAPI(data) {
    return axios.get('/user')
}

function* myinfo(action) {
    try {
        const result = yield call(myinfoAPI, action.data)
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,

        })
    } catch (err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    } 
}


function loginAPI(data) {
    return axios.post('/user/login', data)
}

function* login(action) {
    console.log('saga data: ', action)
    try {
        const result = yield call(loginAPI, action.data)
        console.log(result)
        // yield delay(1000)
        yield put({
            type: LOGIN_SUCCESS,
            data: result.data //post로 받아온 데이터
            // data: action.data,
        })
    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            error: err.response.data,
        })
    } 
}

function logoutAPI(data) {
    return axios.post('/user/logout')
}

function* logout(action) {
    
    try {
        yield call(logoutAPI)
        // yield delay(1000)
        yield put({
            type: LOGOUT_SUCCESS,
        })
        
    } catch(err) {
        yield put({
            type: LOGOUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signupAPI(data) {
    return axios.post('http://localhost:3065/user', data)
}


function* signup(action) {
    
    try {
        const result = yield call(signupAPI, action.data)
        console.log(result)
        // yield delay(1000)
        // console.log(action)
        yield put({
            type: SIGNUP_SUCCESS,
            // result: result.data,
        })
    } catch(err) {
        yield put({
            type: SiGNUP_FAILURE,
            error: err.response.data, //여기서 err.response.data는 서버쪽에서 보내준 404에러 메시지
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


function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data }) //컴포넌트에서 dispatch할때 nickname 값만 전달해줬기 때문에 서버에 요청할때는 객체에 이름붙여서 고고 
}
function* changenickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data)
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data
        })
    } catch(err) {
        console.error(err)
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data // action.error. catch(err) 이부분 err로 서버에러 들어옴
        })
    }
}

// 여기서 받는 request 액션에 실어오는 payload가 login함수에 action으로 전달함 그래서 거기서 type data를 받아올 수 있음
function* watchMyinfo() { 
    yield takeLatest(LOAD_MY_INFO_REQUEST, myinfo)
}

function* watchLogin() { 
    yield takeLatest(LOGIN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function* watchSignup() {
    yield takeLatest(SIGNUP_REQUEST, signup)
}

function* watchfollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchunfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

function* watchchangenickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changenickname)
}

export default function* userSaga () {
    yield all([
        fork(watchMyinfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchfollow),
        fork(watchunfollow),
        fork(watchchangenickname),
    ]);
}