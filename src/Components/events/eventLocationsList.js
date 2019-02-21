import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Card } from 'semantic-ui-react'


class EventLocationsList extends Component {
  render() {
      const {handleLocationSelect,locations, eventID} = this.props
      console.log('ev id', eventID)

    return (
      <div>
        {
            (locations && locations.length > 0 ) ? 
            (
                locations.map(location => {
                    return(
                        <Card key={location.id}>
                            <Card.Content header=
                                {
                                    <a onClick={() => {handleLocationSelect(location)}}>{location.title}</a>
                                }
                            />
                        </Card> 
                    )
                })
            )
            :
            (
                <div>
                    No Locations.
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
        locations : reduxState.firestore.ordered.locations

    }
    
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'locations',
            where: [['eventRef', '==', props.eventID]]
        }
    ])
)(EventLocationsList)