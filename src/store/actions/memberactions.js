export const createMember = (member) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('members').add({
            first_name: member.fname,
            last_name: member.lname,
            dob: new Date(member.dob+ " 00:00"),
            gender: member.gender,
            phone: member.phone,
            type: member.type,
            createdOn: new Date(),
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_MEMBER', member});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_EVENT_ERROR', err});
        }) 
       

    }
}