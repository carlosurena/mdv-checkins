import React from 'react';
import {Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button,Card } from 'semantic-ui-react'

const StationLocationsList = (props) => {

    const {locations, handleLocationSelect,eventID } = props;
    console.log('loc', locations)
    console.log('ev id', eventID)
        return(
            
            <div className="ui one column centered">
                <h2>Choose a Location</h2>
                {(locations && locations.length > 0) ? (locations.map(location =>{
                    return( 

                           
                            
                            <Card key={location.id}>
                                <Card.Content header={
                                    <a onClick={() => {handleLocationSelect(location)}}>{location.title}</a>
                                }
                                />
                                
                        </Card> 
                    )})) :
                    (
                        <div>
                            <p>No locations available. Please ask your system administrator to add locations for this event!</p>
                            <Button>Return</Button>

                            </div>
                    )
                }
        
            </div>
        )


}

const mapStateToProps = (reduxState) =>{

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
)(StationLocationsList)