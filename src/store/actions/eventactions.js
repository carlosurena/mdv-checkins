export const createEvent = (event) => {
    return (dispatch, getState) => {
        //make async call to database

        
        dispatch({ type: 'CREATE_EVENT', event: event})

    }
}