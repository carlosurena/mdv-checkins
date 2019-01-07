import authReducer from './authReducer';
import eventReducer from './eventReducer';
import memberReducer from './memberReducer';
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    member: memberReducer,
    firestore: firestoreReducer
});

export default rootReducer