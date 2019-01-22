const initState = {
    sheets: [
    ],
    currentSheet:null

};

const sheetReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SHEET':
            console.log('sheet created:', action.sheet);
            return state;
        case 'CREATE_SHEET_ERROR':
            console.log("There was an error creating a sheet", action.error);
            return state;
        case 'ADD_ATTENDEE':
            console.log('attendee added:', action.attendeeID);
            return state;
        case 'ADD_ATTENDEE_ERROR':
            console.log("There was an error adding an attendee to the sheet", action.error);
            return state;
        case 'SET_CURRENT_SHEET':
            console.log('current sheet set:', action.data);
            return{
                ...state,
                currentSheet: action.data
            }
        case 'SET_CURRENT_SHEET_ERROR':
            console.log("There was an error setting the current sheet", action.error);
            return state;
        case 'UPDATE_CURRENT_SHEET':
            console.log('current sheet updated:', action.data);
            return{
                // ...state,
                currentSheet: action.data
            }
        case 'UPDATE_CURRENT_SHEET_ERROR':
            console.log("There was an error updating the current sheet", action.error);
            return state;
        default:
            return state;

    }
}
export default sheetReducer