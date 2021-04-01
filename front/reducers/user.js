

 export const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isLoggedIn: false,
    me: null,
    loginData: {},
    signupData: {},
   
}


export const login_request_action = (data) => {
    return {
        type: "LOGIN_REQUEST",
        data: data,
    }    
}


export const logout_request_action = () => {
    return {
        type: "LOGOUT_REQUEST",
    }
}




const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN_REQUEST" :
            return {
                ...state,
                isLoggingIn: true,
            }
        
        case "LOGIN_SUCCESS" :
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                me: { ...action.data, nickname: 'userNick' },
            }

        case "LOGIN_FAILURE" :
            return {
                ...state,
                isLoggingIn: false,
            }

        case "LOGOUT_REQUEST" : 
            return {
                ...state,
                isLoggingOut: true,
            }

        case "LOGOUT_SUCCESS" : 
            return {
                ...state,
                isLoggedIn: false,
                isLoggingOut: false,
                me: null,
            }

        case "LOGOUT_FAILURE" : 
            return {
                ...state,
                isLoggingOut: false,
            }

        default: return state
        
    }
}

export default reducer
