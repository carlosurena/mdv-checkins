import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StationSearch from './stationSearch'
import AttendeesList from './attendeesList'
import { getTodaySheetFromSelection,createSheet, addAttendee, setCurrentSheet, updateCurrentSheet } from '../../store/actions/sheetActions'
import { Button } from 'semantic-ui-react'
import AddMember from '../members/addMember'


class StationCheckin extends Component {
    state = {
        searchingComplete : false,
        viewSheet : true,
    }

    addAttendee = (attendeeID) => {
        //console.log('adding attendee to db', attendeeID)
        this.props.addAttendee(this.props.currentSheet,attendeeID,this.props.user)
        this.props.updateCurrentSheet()
    }



    componentDidMount(){
        const { eventID,locationID,user} = this.props
        this.props.getTodaySheetFromSelection(eventID,locationID,user)
    }
    handleViewSheet = () => {
        this.setState( prevState => ({
            viewSheet : !(prevState.viewSheet)
        }))
    }

    testBtn = (e) => {
        //console.log(this.props.currentSheet)
        //this.props.createSheet(this.props.eventID,this.props.locationID,this.props.user)
    }

    handleModal = (e) => {

    }
    
  render() {
    const { sheets, currentDate, members, currentSheet } = this.props
    return (
      <div className="column">
        {
            (currentSheet) ? (
                <div className="column">
                    
                   <div className="basic segment"></div>
                    <div className="ui basic segment">
                        <div className="ui one column center aligned grid">
                        <StationSearch addAttendee={ (attendee) =>{this.addAttendee(attendee)} } members={members}/>
                            <AddMember />
                            <div className="">
                                <Button onClick={this.handleViewSheet}>{this.state.viewSheet ? ('Hide Attendance Sheet') : ('View Attendance Sheet')}</Button>
                                <Button >{this.state.viewSheet ? ('Check Me In') : ('Checked In')}</Button>

                            </div>
                        </div>

                    </div>
                    <div className="column stretched">
                        {this.state.viewSheet && (
                            <AttendeesList members={members} sheet={currentSheet}/>

                        )}
                    </div>
                        
                    
                </div>
                
            ) 
            :
            (
                <div className="">Loading...</div>
            )
        }
          
        
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
    //console.log('sheets!', reduxState.firestore.ordered.sheets)
    return{
        sheets : reduxState.firestore.ordered.sheets,
        currentSheet : reduxState.sheet.currentSheet,
        user : reduxState.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addAttendee: (sheet,attendeeID,user) => dispatch(addAttendee(sheet,attendeeID,user)),
        setCurrentSheet: (sheet) => dispatch(setCurrentSheet(sheet)),
        updateCurrentSheet: () => dispatch(updateCurrentSheet()),
        getTodaySheetFromSelection: (eventRef,locationRef,user) => dispatch(getTodaySheetFromSelection(eventRef,locationRef,user))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'sheets'
            
        }
    ])
)(StationCheckin)
