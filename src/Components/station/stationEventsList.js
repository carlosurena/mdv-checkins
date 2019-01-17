import React from 'react';
import {Link} from 'react-router-dom'

const StationEventsList = (props) => {

    const {events, handleEventSelect} = props;
        return(
            
            <div className="section">
                <h2>Choose an Event</h2>
                {events && events.map(event =>{
                    return( 

                            <div className="card z-depth-1" key={event.id}>
                                <div className="card-content">
                                    <a onClick={() => {handleEventSelect(event)}}><span className="card-title">{event.title}</span></a>
                                    <p>Type: {event.isRecurring ? "Recurring":"Single Event"}</p>
                                    <p> Created on: {(new Date(event.createdOn.toDate()).toLocaleString().split(",")[0])}</p>
                                    <p> Day of Week: {event.weekday}</p>
                                </div>
                            </div> 
                    )})
                }
        
            </div>
        )


}

export default StationEventsList