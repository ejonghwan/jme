export const initialState = {
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    me: null,
    loginData: {},
    signupData: {},
   
}


export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT_REQUEST = "LOGIN_FAILURE"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SiGNUP_FAILURE = "SiGNUP_FAILURE"

export const FOLLOW_REQUEST = "FOLLOW_REQUEST"
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS"
export const FOLLOW_FAILURE = "FOLLOW_FAILURE"

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST"
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS"
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE"


export const login_request_action = (data) => {
    return {
        type: LOGIN_REQUEST,
        data: data,
    }    
}

export const logout_request_action = () => {
    return {
        type: LOGOUT_REQUEST,
    }
}

const dummyUser = data => ({
    ...data,
    nickname: 'jjong',
    id: 1,
    Posts: ['asd'],
    Followings: ['asd'],
    Followers: []
})


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST :
            return {
                ...state,
                loginLoading: true,
                loginDone: false,
                loginError: null,
            }
        
        case LOGIN_SUCCESS :
            return {
                ...state,
                loginDone: true,
                loginLoading: false,
                me: dummyUser(action.data),
            }

        case LOGIN_FAILURE :
            return {
                ...state,
                loginLoading: false,
                loginError: action.error,
            }

        case LOGOUT_REQUEST : 
            return {
                ...state,
                logoutLoading: true,
                logoutDone: false,
                logoutError: null
            }

        case LOGOUT_SUCCESS : 
            return {
                ...state,
                // loginDone: false,
                logoutLoading: false,
                logoutDone: true,
                me: null,
            }

        case LOGOUT_FAILURE : 
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.error,
            }

        case SIGNUP_REQUEST : 
            return {
                ...state,
                singupLoading: true,
                singupDone: false,
                singupError: null
            }

        case SIGNUP_SUCCESS : 
            return {
                ...state,
                singupLoading: false,
                singupDone: true,
            }

        case SiGNUP_FAILURE : 
            return {
                ...state,
                singupLoading: false,
                singupError: action.error,
            }

        default: return state
        
    }
}

export default reducer
