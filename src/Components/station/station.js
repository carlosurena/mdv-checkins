import React, {Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import StationSearch from './stationSearch'
import StationEventsList from './stationEventsList'
import {compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

class Station extends Component {

    state={
        event: null,
        attendees : {}

    }

    handleEventSelect = (event) => {
        this.setState({
            event : event
        })
        console.log('handling edit click', this.state)
        
    }
    
    render(){
        const { user,members } = this.props
        if(user.isEmpty) return <Redirect to='/' />
        return(
            <div className="section green lighten-4 station-container">
                <div className="row container">
                    <StationSearch members={members}/>
                    <StationEventsList handleEventSelect={ (event) =>{this.handleEventSelect(event)} } events={this.props.events}/>
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
        events: reduxState.firestore.ordered.events
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection : 'events'
        }
    ])
    )(Station)