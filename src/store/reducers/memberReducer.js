const initState = {
    members: [
        { fname: "John", lname: "Mason", gender: "M", dob: "12/1/2000", ministry: "Alabanza", phone: "2035348274", id: 1 },
        { fname: "Jason", lname: "Carmack", gender: "M", dob: "11/15/1996", ministry: "PowerKids", phone: "2035847365", id: 2 },
        { fname: "Raven", lname: "Patrice", gender: "F", dob: "4/08/1998", ministry: "Danza", phone: "2035906839", id: 3 },
        { fname: "Benorqui", lname: "Houdini", gender: "F", dob: "3/24/2000", ministry: "Hartistas", phone: "2038693058", id: 4 }

    ]
};

const memberReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_MEMBER':
            console.log("created member", action.member);
            return state;
        case 'CREATE_MEMBER_ERROR':
            console.log("There was en error creating a member", action.error);
            return state;
        case 'UPDATE_MEMBER':
            console.log('member updated:', action.member);
            return state;
        case 'UPDATE_MEMBER_ERROR':
            console.log("There was en error updating a member", action.error);
            return state;
        default:
            return state;

    }
}

export default memberReducer