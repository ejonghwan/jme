
import produce from 'immer' 

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
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    loginData: {},
    signupData: {},
}

const dummyUser = data => ({
    ...data,
    nickname: 'jjong',
    Posts: [{id: 1}, ],
    Followings: [{nickname: 'a'},{nickname: 'b'},{nickname: 'c'},{nickname: 'd'},{nickname: 'e'},{nickname: 'f'},],
    Followers: [{nickname: 'a'},{nickname: 'b'},{nickname: 'c'},{nickname: 'd'},{nickname: 'e'},{nickname: 'f'},],
})



export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT_REQUEST = "LOGIN_FAILURE"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SiGNUP_FAILURE = "SiGNUP_FAILURE"

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST"
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS"
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE"

export const FOLLOW_REQUEST = "FOLLOW_REQUEST"
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS"
export const FOLLOW_FAILURE = "FOLLOW_FAILURE"

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST"
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS"
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE"

export const ADD_POST_TO_ME = "ADD_POST_TO_ME"
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME"

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



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {

            case LOGIN_REQUEST: {
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;
            }

            case LOGIN_SUCCESS: {
                draft.loginDone = true;
                draft.loginLoading = false;
                draft.me = dummyUser(action.data);
                break;
            }

            case LOGIN_FAILURE: {
                draft.loginLoading = false;
                draft.loginError = action.error;
                break;
            }

            case LOGOUT_REQUEST: {
                draft.logoutLoading = true;
                draft.logoutDone = false;
                draft.logoutError = null;
                break;
            }

            case LOGOUT_SUCCESS: {
                draft.logoutLoading = false;
                draft.logoutDone = true;
                draft.me = null;
                break;
            }

            case LOGOUT_FAILURE: {
                draft.logoutLoading = false;
                draft.logoutError = action.error;
                break;
            }

            case SIGNUP_REQUEST: {
                draft.singupLoading = true;
                draft.singupDone = false;
                draft.singupError = null;
                break;
            }

            case SIGNUP_SUCCESS: {
                draft.singupLoading = false;
                draft.singupDone = true;
                break;
            }

            case SiGNUP_FAILURE: {
                draft.singupLoading = false;
                draft.singupError = action.error;
                break;
            }

            case CHANGE_NICKNAME_REQUEST: {
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            }

            case CHANGE_NICKNAME_SUCCESS: {
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            }

            case CHANGE_NICKNAME_FAILURE: {
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            }
       
            case ADD_POST_TO_ME: {
                draft.me.Posts.unshift({id: action.data})
                break;
            }

            case REMOVE_POST_OF_ME: {
                // console.log(action)
                draft.me.Posts = draft.me.Posts.filter(val => val.id !== action.data)
                break;
            }

            default: break;                 
            
        }
    })
    
}

export default reducer



// switch(action.type) {
//     case LOGIN_REQUEST :
//         return {
//             ...state,
//             loginLoading: true,
//             loginDone: false,
//             loginError: null,
//         }
    
//     case LOGIN_SUCCESS :
        
//         return {
//             ...state,
//             loginDone: true,
//             loginLoading: false,
//             me: dummyUser(action.data),
//         }

//     case LOGIN_FAILURE :
//         return {
//             ...state,
//             loginLoading: false,
//             loginError: action.error,
//         }

//     case LOGOUT_REQUEST : 
//         return {
//             ...state,
//             logoutLoading: true,
//             logoutDone: false,
//             logoutError: null
//         }

//     case LOGOUT_SUCCESS : 
//         return {
//             ...state,
//             // loginDone: false,
//             logoutLoading: false,
//             logoutDone: true,
//             me: null,
//         }

//     case LOGOUT_FAILURE : 
//         return {
//             ...state,
//             logoutLoading: false,
//             logoutError: action.error,
//         }

//     case SIGNUP_REQUEST : 
//         return {
//             ...state,
//             singupLoading: true,
//             singupDone: false,
//             singupError: null
//         }

//     case SIGNUP_SUCCESS : 
//         return {
//             ...state,
//             singupLoading: false,
//             singupDone: true,
//         }

//     case SiGNUP_FAILURE : 
//         return {
//             ...state,
//             singupLoading: false,
//             singupError: action.error,
//         }

//     case CHANGE_NICKNAME_REQUEST : 
//         return {
//             ...state,
//             changeNicknameLoading: true,
//             changeNicknameDone: false,
//             changeNicknameError: null
//         }

//     case CHANGE_NICKNAME_SUCCESS : 
//         return {
//             ...state,
//             changeNicknameLoading: false,
//             changeNicknameDone: true,
//         }

//     case CHANGE_NICKNAME_FAILURE : 
//         return {
//             ...state,
//             changeNicknameLoading: false,
//             changeNicknameError: action.error,
//         }

//     case ADD_POST_TO_ME: {
//         return {
//             ...state,
//             me: {
//                 ...state.me,
//                 Posts: [{id: action.data}, ...state.me.Posts]
//             }
//         }
//     }

//     case REMOVE_POST_OF_ME: {
//         return {
//             ...state,
//             me: {
//                 ...state.me,
//                 Posts: state.me.Posts.filter(val => val.id !== action.id)
//             }
//         }
//     }
//     default: return state
// }