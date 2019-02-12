import React, { Component } from 'react';
import {Button, Card} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setCurrentLocation,resetCurrentLocation} from '../../store/actions/locationactions'
import { setCurrentSheet, resetCurrentSheet } from '../../store/actions/sheetActions'
import { firestoreConnect } from 'react-redux-firebase' 
import EventLocationsList from './eventLocationsList'
import EventSheetsList from './eventSheetsList'
import AttendeesList from '../station/attendeesList'

class EventLocations extends Component {
 state = {

 }
 componentDidMount() {
  this.props.resetCurrentLocation();
  this.props.resetCurrentSheet();
}

handleLocationSelect = (location) => {
  this.props.setCurrentLocation(location)
  this.props.resetCurrentSheet();
  console.log('handling location click', this.state)
  
}
handleSheetSelect = (sheet) => {

  this.props.setCurrentSheet(sheet)
  console.log('handling sheet click', sheet)
  
}

handleBack = (e) => {
  this.props.resetCurrentSheet();
}

  render() {
    const { eventID, members, currentLocation, currentSheet } = this.props
    return(
        <div className="ui container">
          <div className="ui basic segment"></div>

                {currentLocation ? (
                    (currentSheet? (
                      <div>
                        <Button onClick={this.handleBack}>Back</Button>
                        <AttendeesList members={members} sheet={currentSheet}/>
                      </div>                    ) : (
                      <div>
                        <EventSheetsList handleSheetSelect={ (sheet) =>{this.handleSheetSelect(sheet)} }  eventID={eventID}  locationID={currentLocation.id} />
                      </div>                    ))
                    ) : 
                    (
                      <div>
                        <EventLocationsList handleLocationSelect={ (location) =>{this.handleLocationSelect(location)} } eventID={eventID} />
                        <Button onClick={() =>{this.props.handleCreateLocation()}} >Add Location</Button>
                      </div>
                    )}

        </div>
    )
}
}           

const mapStateToProps = (reduxState) =>{
  console.log('reduxstate',reduxState)
  return {
    currentLocation: reduxState.location.currentLocation,
    currentSheet: reduxState.sheet.currentSheet,
    members : reduxState.firestore.ordered.members
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentLocation : (location) => dispatch(setCurrentLocation(location)),
    setCurrentSheet : (sheet) => dispatch(setCurrentSheet(sheet)),
    resetCurrentLocation : () => dispatch(resetCurrentLocation()),
    resetCurrentSheet : () => dispatch(resetCurrentSheet())
 
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props =>[
    {
        collection : 'members'
    }
])
)(EventLocations) 
