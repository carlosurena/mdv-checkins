import React, {Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import StationEventsList from './stationEventsList'
import StationLocationsList from './stationLocationsList'
import StationCheckin from './stationCheckin'
import {compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { resetCurrentEvent,setCurrentEvent, updateCurrentEvent } from '../../store/actions/eventactions'
import { resetCurrentLocation,setCurrentLocation, updateCurrentLocation } from '../../store/actions/locationactions'
import { resetCurrentSheet } from '../../store/actions/sheetActions'


class Station extends Component {

    state={
        currentDate: new Date()
    }

    handleEventSelect = (event) => {
        this.props.setCurrentEvent(event)
        //reset currentLocation
        this.props.resetCurrentLocation();
        this.props.resetCurrentSheet();
        console.log('handling event click', this.state)
        
    }
    handleLocationSelect = (location) => {
        this.props.setCurrentLocation(location)
        this.props.resetCurrentSheet();
        console.log('handling location click', this.state)
        
    }
    componentDidMount(){
        console.log('reset currentEvent and location')
        this.props.resetCurrentEvent();
        this.props.resetCurrentLocation();
        this.props.resetCurrentSheet();
    }

    render(){
        const { user,members, currentEvent, currentLocation } = this.props
        if(user.isEmpty) return <Redirect to='/' />
        return(
            <div className="section green lighten-4 station-container">
                <div className="row container">
                    {currentEvent ? (
                        (currentLocation? (
                            <StationCheckin event={currentEvent} eventID={currentEvent.id} currentDate={this.state.currentDate} members={this.props.members} locationID={currentLocation.id}/>

                        ) : (
                            <StationLocationsList handleLocationSelect={ (location) =>{this.handleLocationSelect(location)} } events={this.props.events} event={currentEvent} eventID={currentEvent.id}/>

                        ))
                        ) : 
                        (
                            <StationEventsList handleEventSelect={ (event) =>{this.handleEventSelect(event)} } events={this.props.events}/>

                        )}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) =>{
    console.log('reduxstate',reduxState)
    return {
        user : reduxState.firebase.auth,
        members : reduxState.firestore.ordered.members,
        events: reduxState.firestore.ordered.events,
        locations: reduxState.firestore.ordered.locations,
        currentEvent: reduxState.event.currentEvent,
        currentLocation: reduxState.location.currentLocation
        
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setCurrentEvent : (event) => dispatch(setCurrentEvent(event)),
        updateCurrentEvent : () => dispatch(updateCurrentEvent()), 
        resetCurrentEvent : () => dispatch(resetCurrentEvent()),
        setCurrentLocation : (location) => dispatch(setCurrentLocation(location)),
        updateCurrentLocation : () => dispatch(updateCurrentLocation()), 
        resetCurrentLocation : () => dispatch(resetCurrentLocation()),
        resetCurrentSheet : () => dispatch(resetCurrentSheet())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props =>[
        {
            collection : 'events'
        },
        {
            collection : 'members'
        }
    ])
    )(Station)