import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StationSearch from './stationSearch'
import AttendeesList from './attendeesList'
import { getTodaySheetFromSelection,createSheet, addAttendee, setCurrentSheet, updateCurrentSheet, checkOutAttendee } from '../../store/actions/sheetActions'
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

    

    handleCheckOut = (attendee) => {
        const {currentSheet, checkOutAttendee, updateCurrentSheet} = this.props
        console.log('checking out', currentSheet,attendee)
        checkOutAttendee(currentSheet.id,attendee.id)
        updateCurrentSheet()


    }
    

  render() {
    const { sheets, currentDate, members, currentSheet, isCheckingOut } = this.props
    return (
      <div className="column">
        {
            (currentSheet) ? (
                <div className="column">
                    
                   <div className="basic segment"></div>
                    <div className="ui basic segment">
                        <div className="ui one column center aligned grid">
                        <StationSearch addAttendee={ (attendee) =>{this.addAttendee(attendee)} } members={members}/>
                            <div className="">
                                <Button onClick={this.handleViewSheet}>{this.state.viewSheet ? ('Hide Attendance Sheet') : ('View Attendance Sheet')}</Button>
                                <Button >{this.state.viewSheet ? ('Check Me In') : ('Checked In')}</Button>

                            </div>
                        </div>

                    </div>
                    <div className="column stretched">
                        {this.state.viewSheet && (
                            <AttendeesList handleCheckOut={(attendee) =>{this.handleCheckOut(attendee)} } isCheckingOut= {isCheckingOut} members={members} sheet={currentSheet}/>

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
        user : reduxState.firebase.auth,
        members : reduxState.firestore.ordered.members,
        isCheckingOut : reduxState.sheet.isCheckingOut
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addAttendee: (sheet,attendeeID,user) => dispatch(addAttendee(sheet,attendeeID,user)),
        setCurrentSheet: (sheet) => dispatch(setCurrentSheet(sheet)),
        updateCurrentSheet: () => dispatch(updateCurrentSheet()),
        getTodaySheetFromSelection: (eventRef,locationRef,user) => dispatch(getTodaySheetFromSelection(eventRef,locationRef,user)),
        checkOutAttendee : (sheet,attendee) => dispatch(checkOutAttendee(sheet,attendee))

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'sheets'
            
        },
        {
            collection: 'members'
            
        }
    ])
)(StationCheckin)
