const initState = {
    authError: null
};

const authReducer = (state = initState, action ) => {
    
    switch(action.type){
        case 'LOGIN_GOOGLE_SUCCESS':
            console.log('logged in.')
            return{
                ...state,
                authError: null
            }
        case 'LOGIN_GOOGLE_ERROR':
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGIN_FACEBOOK_SUCCESS':
            console.log('Logged in.')
            return{
                ...state,
                authError: null
            }
        case 'LOGIN_FACEBOOK_ERROR':
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOG_OUT_SUCESS':
            console.log("Signed out")
            return state
        case 'LOG_OUT_ERROR':
            console.log('error logging out')
            return state
        default:
            return state;
    }
}

export default authReducer