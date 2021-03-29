

 export const initialState = {
    
    isLoggedIn: false,
    me: null,
    loginData: {},
    signupData: {},
   
}


export const login_action = (data) => {
    return {
        type: "LOGIN_ACTION",
        data: data,
    }    
}

export const logout_action = () => {
    return {
        type: "LOGOUT_ACTION",
    }
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN_ACTION" :
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            } 

        case "LOGOUT_ACTION" : 
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }

        default: return state
        
    }
}

export default reducer
