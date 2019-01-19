export const createEvent = (event,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        firestore.collection('events').add({
            title: event.title,
            isRecurring: event.isRecurring,
            weekday: event.weekday,
            eventTime: event.eventTime,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date(),
            locations : null
        }).then( () => {
            dispatch({ type: 'CREATE_EVENT', event});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_EVENT_ERROR', err});
        }) 
       

    }
}



export const updateEvent = (event) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('events').doc(event.id).set({
            title: event.title,
            isRecurring: event.isRecurring,
            weekday: event.weekday,
            eventTime: event.eventTime,
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'UPDATE_EVENT', event});
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_EVENT_ERROR', err});
        }) 
       

    }
}

export const deleteEvent = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('events').doc(id).delete().then( () => {
            dispatch({ type: 'DELETE_EVENT', id});
        }).catch( (err) =>{
            dispatch({ type: 'DELETE_EVENT_ERROR', err});
        }) 
    }
}
