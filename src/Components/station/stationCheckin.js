import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import StationSearch from './stationSearch'
import AttendeesList from './attendeesList'
import { addAttendee, setCurrentSheet, updateCurrentSheet } from '../../store/actions/sheetActions'
import { Button } from 'semantic-ui-react'

class StationCheckin extends Component {
    state = {
        searchingComplete : false,
        viewSheet : false,
    }

    addAttendee = (attendeeID) => {
        console.log('adding attendee to db', attendeeID)
        this.props.addAttendee(this.props.currentSheet,attendeeID)
        this.props.updateCurrentSheet()
    }

    findSheet = () =>{
        const { sheets, currentDate, setCurrentSheet } = this.props
        console.log('sheets', sheets)
        
        const currentSheet = sheets && sheets.find( sheet => {
            return (
                sheet.date.toDate().getFullYear() == currentDate.getFullYear() &&
                sheet.date.toDate().getMonth() == currentDate.getMonth() &&
                sheet.date.toDate().getDate() == currentDate.getDate()
            )
        })
        if(sheets){
            if(currentSheet){
                console.log('sheet found. ', currentSheet)
                setCurrentSheet(currentSheet)
                this.setState({
                    searchingComplete : true
                })
                
            }else {
                console.log('sheet not found.')
                //createNewSheet()
                this.setState({
                    searchingComplete : true
                })
            }
        }
        
    }



    handleViewSheet = () => {
        this.setState( prevState => ({
            viewSheet : !(prevState.viewSheet)
        }))
    }

    testBtn = (e) => {
        console.log(this.props.currentSheet)
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
                                <Button onClick={this.handleViewSheet}>View Attendence Sheet</Button>
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
                    'Loading'
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
    return{
        sheets : reduxState.firestore.ordered.sheets,
        currentSheet : reduxState.sheet.currentSheet
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addAttendee: (sheet,attendeeID) => dispatch(addAttendee(sheet,attendeeID)),
        setCurrentSheet: (sheet) => dispatch(setCurrentSheet(sheet)),
        updateCurrentSheet: () => dispatch(updateCurrentSheet())
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'sheets',
            where: [
                ['eventRef', '==', props.eventID], 
                ['locationRef', '==', props.locationID],
            ],
            queryParams: [ 
                'limitToLast' 
            ] 
        }
    ])
)(StationCheckin)
