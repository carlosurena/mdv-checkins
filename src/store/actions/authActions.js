export const loginGoogle = () => {
    return (dispatch, getState, {getFirebase}) => {
        //make async call to database

        const firebase = getFirebase();
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(GoogleProvider).then( (result) => {
            const user = result.user;
            dispatch({ type:'LOGIN_GOOGLE_SUCESS', user});
        }).catch( (err) =>{
            dispatch({ type : 'LOGIN_GOOGLE_ERROR', err})
        })
    }
}
export const loginFacebook = () => {
    return (dispatch, getState, {getFirebase}) => {
        //make async call to database

        const firebase = getFirebase();
        const FacebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(FacebookProvider).then( (result) => {
            const user = result.user
            dispatch({ type:'LOGIN_FACEBOOK_SUCESS', user});
        }).catch( (err) =>{
            dispatch({ type : 'LOGIN_FACEBOOK_ERROR', err})
        })
    }
}

export const logOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        //make async call to database

        const firebase = getFirebase();
        firebase.auth().signOut().then( () =>{
            dispatch({ type : 'LOG_OUT_SUCCESS'})
        })
    }
}