export const createEvent = (event) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('events').add({
            title: event.title,
            isRecurring: event.isRecurring,
            weekday: event.weekday,
            eventTime: event.eventTime,
            createdOn: new Date(),
            updatedOn: new Date()
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