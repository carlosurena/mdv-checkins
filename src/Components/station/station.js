import React, {Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import StationSearch from './stationSearch'
import StationEventsList from './stationEventsList'
import StationLocationsList from './stationLocationsList'
import {compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

class Station extends Component {

    state={
        event: null,
        location: null,
        eventID: '',
        attendees : {}

    }

    handleEventSelect = (event) => {
        this.setState({
            event : event,
            eventID: event.id
        })
        console.log('handling event click', this.state)
        
    }
    handleLocationSelect = (location) => {
        this.setState({
            location : location
        })
        console.log('handling location click', this.state)
        
    }

    render(){
        const { user,members } = this.props
        if(user.isEmpty) return <Redirect to='/' />
        return(
            <div className="section green lighten-4 station-container">
                <div className="row container">
                    <StationSearch members={members}/>
                    {this.state.event ? (
                            <StationLocationsList handleLocationSelect={ (location) =>{this.handleLocationSelect(location)} } events={this.props.events} event={this.state.event} eventID={this.state.eventID}/>
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
        locations: reduxState.firestore.ordered.locations
        
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props =>[
        {
            collection : 'events'
        }
    ])
    )(Station)