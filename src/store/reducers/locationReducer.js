const initState = {
    locations: [
        

    ]

};

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_LOCATION':
            console.log('location created:', action.location);
            return state;
        case 'CREATE_LOCATION_ERROR':
            console.log("There was an error creating a location", action.error);
            return state;
        default:
            return state;

    }
}
export default eventReducer