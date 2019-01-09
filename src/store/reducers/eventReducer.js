const initState = {
    events: [
        { id: 1, title: "Manantiales de Vida", type: "recurring", weekday: "Friday", occurence: "weekly", createdOn: "12/30/2018", creatorID: 23254 },
        { id: 2, title: "Iglesia de Niños", type: "recurring", weekday: "Sunday", occurence: "weekly", createdOn: "12/30/2018", creatorID: 23254 },
        { id: 3, title: "Retiro de Hombres", type: "single", startDate: "2/4/2019", endDate: "2/72019", createdOn: "12/30/2018", creatorID: 23254 },
        { id: 4, title: "Retiro de Mujeres", type: "single", startDate: "2/4/2019", endDate: "2/72019", createdOn: "12/30/2018", creatorID: 23254 }


    ]

};

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            console.log("created event", action.event);
            return state;
        case 'CREATE_EVENT_ERROR':
            console.log("There was en error creating a event", action.error);
            return state;
        case 'UPDATE_EVENT':
            console.log('event updated:', action.event);
            return state;
        case 'UPDATE_EVENT_ERROR':
            console.log("There was en error updating a event", action.error);
            return state;
        default:
            return state;

    }
}
export default eventReducer