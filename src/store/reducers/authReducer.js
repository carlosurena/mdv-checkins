const initState = {
    authError: null,
    isNewUser: null,
    user: null,

};

const authReducer = (state = initState, action ) => {
    
    switch(action.type){
        case 'LOGIN_GOOGLE_SUCCESS':
            console.log('logged in.')
            return{
                ...state,
                authError: null,
                isNewUser: false,
                user: action.data
            }
        case 'LOGIN_GOOGLE_ERROR':
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGIN_FACEBOOK_SUCCESS':
            console.log('FB login success.', action.data)
            return{
                ...state,
                authError: null,
                isNewUser: false,
                user: action.data
            }
        case 'LOGIN_FACEBOOK_ERROR':
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOG_OUT_SUCESS':
            console.log("Signed out")
            return{
                ...state,
                user: null
            }
        case 'CREATE_USER':
            console.log("user created", action.data)
            return{
                ...state,
                user: action.data
            }
        case 'CREATE_USER_ERROR':
            console.log("user creation error", action.err)
            return state;
        case 'LOG_OUT_ERROR':
            console.log('error logging out')
            return state
        case 'CREATE_ACCESS_REQUEST':
            console.log('request created')
            return state
        default:
            return state;
    }
}

export default authReducer