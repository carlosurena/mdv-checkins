export const createSheet = (eventID,locationID,user, sheet) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('sheets').add({
            date: new Date(),
            attendees : [],
            eventRef: eventID,
            locationRef: locationID,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_LOCATION', locationID});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_LOCATION_ERROR', err});
        }) 

    }
}

export const addAttendee = (sheet, attendeeID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating attendee array with: ",sheet.id,attendeeID)
        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('sheets').doc(sheet.id).update({
            attendees : firestore.FieldValue.arrayUnion(attendeeID)
        }).then( () => {
            dispatch({ type: 'ADD_ATTENDEE', attendeeID});
        }).catch( (err) =>{
            dispatch({ type: 'ADD_ATTENDEE_ERROR', err});
        }) 

    }
}

export const setCurrentSheet = (sheet) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current sheet")
        
        const firestore = getFirestore();
        // const creatorRef = firestore.collection('users').doc(user.uid)
        // var eventRef = firestore.collection('events').doc(eventID);
        var sheetRef = firestore.collection('sheets').doc(sheet.id);

        sheetRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = sheet.id;
                console.log(data)
                dispatch({ type: 'SET_CURRENT_SHEET', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'SET_CURRENT_SHEET_ERROR', err});
        }) 

    }
}

export const updateCurrentSheet = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating current sheet",)
        const currentSheetID = getState().sheet.currentSheet.id;
         
        const firestore = getFirestore();
        const sheetRef = firestore.collection('sheets').doc(currentSheetID);
        sheetRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = currentSheetID;
                console.log(data)
                dispatch({ type: 'UPDATE_CURRENT_SHEET', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_CURRENT_SHEET_ERROR', err});
        }) 

    }
}
