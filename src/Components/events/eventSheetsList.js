import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button,Card } from 'semantic-ui-react'
import { getSheetsFromLocation } from '../../store/actions/sheetActions';


class EventSheetsList extends Component {

    state = {

    }
    getSheets = () => {
        const { eventID, locationID, getSheetsFromLocation } = this.props;
        getSheetsFromLocation(locationID,eventID);

    }

    
    componentDidMount(){
        const { eventID, locationID, getSheetsFromLocation } = this.props;
        getSheetsFromLocation(locationID,eventID);
    }

  render() {
      const {handleSheetSelect,sheets, eventID, locationID} = this.props
      console.log('ev id', eventID)
      console.log('loc id', locationID)


    return (
      <div>
        {
            (sheets && sheets.length > 0 ) ? 
            (
                sheets.map(sheet => {
                    return(
                        <Card key={sheet.id}>
                            <Card.Content header=
                                {
                                    <a onClick={() => handleSheetSelect(sheet)}>{new Date(sheet.date.toDate()).toLocaleString().split(",")[0]} </a>
                                }
                            />
                        </Card> 
                    )
                })
            )
            :
            (
                <div>
                    No Sheets.
                </div>
            )
        }
      </div>
    )
  }
}
const mapStateToProps = (reduxState) =>{
    console.log('event locations list locations', reduxState.firestore.ordered.locations)
    return{
        sheets : reduxState.sheet.sheets

    }
    
}
const mapDispatchToProps = (dispatch) =>{

    return{
        getSheetsFromLocation : (locationRef,eventRef) => dispatch(getSheetsFromLocation(locationRef,eventRef))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'sheets'
        }
    ])
)(EventSheetsList)