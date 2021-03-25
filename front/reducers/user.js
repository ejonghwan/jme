

 export const initialState = {
    
    isLoggedIn: false,
    user: {},
    data: {},
   
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
                data: action.data,
            } 

        case "LOGOUT_ACTION" : 
            return {
                ...state,
                isLoggedIn: false,
                data: null,
            }

        default: return state
        
    }
}

export default reducer
