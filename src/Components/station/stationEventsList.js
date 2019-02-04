import React from 'react';
import {Link} from 'react-router-dom'
import {Card,Icon} from 'semantic-ui-react'

const StationEventsList = (props) => {

    const {events, handleEventSelect} = props;
        return(
            
            <div className="ui one column centered">
                <h2>Choose an Event</h2>
                {events && events.map(event =>{
                    return( 

                            <Card fluid key={event.id}>
                                <Card.Content header={
                                    <a onClick={() => {handleEventSelect(event)}}><span className="">{event.title}</span></a>} />
                               
                                
                        </Card> 
                    )})
                }
        
            </div>
        )


}

export default StationEventsList