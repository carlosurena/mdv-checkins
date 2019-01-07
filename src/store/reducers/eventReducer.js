const initState = {
    events:[
        { id: 1, title: "Manantiales de Vida", type: "recurring", weekday: "Friday", occurence: "weekly", createdOn : "12/30/2018", creatorID : 23254 },
        { id: 2, title: "Iglesia de Niños", type: "recurring", weekday: "Sunday", occurence: "weekly", createdOn : "12/30/2018", creatorID : 23254 },
        { id: 3, title: "Retiro de Hombres", type: "single", startDate: "2/4/2019", endDate: "2/72019", createdOn : "12/30/2018", creatorID : 23254 },
        { id: 4, title: "Retiro de Mujeres", type: "single", startDate: "2/4/2019", endDate: "2/72019", createdOn : "12/30/2018", creatorID : 23254 }


    ]

};

const eventReducer = (state = initState, action ) => {
    return state
}

export default eventReducer