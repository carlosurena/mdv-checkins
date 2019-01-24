import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StationSearch from './stationSearch'
import AttendeesList from './attendeesList'
import { getTodaySheetFromSelection,createSheet, addAttendee, setCurrentSheet, updateCurrentSheet } from '../../store/actions/sheetActions'
import { Button } from 'semantic-ui-react'

class StationCheckin extends Component {
    state = {
        searchingComplete : false,
        viewSheet : false,
    }

    addAttendee = (attendeeID) => {
        //console.log('adding attendee to db', attendeeID)
        this.props.addAttendee(this.props.currentSheet,attendeeID,this.props.user)
        this.props.updateCurrentSheet()
    }

    findSheet = () =>{
        const { sheets, currentDate, setCurrentSheet } = this.props
        //console.log('sheets', sheets)
        


        // const currentSheet = sheets && sheets.find( sheet => {
        //     return (
        //         sheet.date.toDate().getFullYear() == currentDate.getFullYear() &&
        //         sheet.date.toDate().getMonth() == currentDate.getMonth() &&
        //         sheet.date.toDate().getDate() == currentDate.getDate()
        //     )
        // })
        // if(sheets){
        //     if(currentSheet){
        //         console.log('sheet found. ', currentSheet)
        //         setCurrentSheet(currentSheet)
        //         this.setState({
        //             searchingComplete : true
        //         })
                
        //     }else {
        //         console.log('sheet not found.')
                
        //         this.setState({
        //             searchingComplete : true
        //         })

        //         this.props.createSheet( this.props.eventID,this.props.locationID ,this.props.user)
        //     }
        // }
        
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
        this.props.createSheet(this.props.eventID,this.props.locationID,this.props.user)
    }
    
  render() {
    const { sheets, currentDate, members, currentSheet } = this.props
    return (
      <div>
        {
            (currentSheet) ? (
                <div className="container section">
                            <div className="center">
                                <StationSearch addAttendee={ (attendee) =>{this.addAttendee(attendee)} } members={members}/>
                                <Button onClick={this.testBtn}>Check me in!</Button>
                                <Button onClick={this.handleViewSheet}>{this.state.viewSheet ? ('Hide Attendance Sheet') : ('View Attendance Sheet')}</Button>
                                {this.state.viewSheet && (
                                    <AttendeesList members={members} sheet={currentSheet}/>

                                )}

                            </div>
                        </div>
                
            ) 
            :
            (
                (this.state.searchingComplete) ? 
                (
                    'Sheet not found. Creating an attendance sheet for today.'
                ) : 
                (
                    this.findSheet()
                )        
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
        createSheet: (eventRef,locationRef,user) => dispatch(createSheet(eventRef,locationRef,user)),
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
