import React from 'react';
import {Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const StationLocationsList = (props) => {

    const {locations, handleLocationSelect,eventID } = props;
    console.log('loc', locations)
    console.log('ev id', eventID)
        return(
            
            <div className="section">
                <h2>Choose a Location</h2>
                {(locations && locations.length > 0) ? (locations.map(location =>{
                    return( 

                            <div className="card z-depth-1" key={location.id}>
                                
                                <div className="card-content">
                                    <a onClick={() => {handleLocationSelect(location)}}><span className="card-title">{location.title}</span></a>
                                </div>
                            </div> 
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