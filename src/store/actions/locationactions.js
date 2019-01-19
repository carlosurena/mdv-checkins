export const createLocation = (eventID,location,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('locations').add({
            title: location.title,
            eventRef: eventID,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_LOCATION', location});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_LOCATION_ERROR', err});
        }) 

    }
}