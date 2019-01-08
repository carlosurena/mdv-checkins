import React from 'react';
import {Link} from 'react-router-dom'

const EventsList = ({events}) => {

    //const {events} = props;
   // console.log(props);
        return(
            
            <div>
                {console.log(events)}
                {events && events.map(event =>{
                    return( 

                            <div className="card z-depth-1" key={event.id}>
                                <div className="card-content">
                                    <Link to={"/event/"+event.id}><span className="card-title">{event.title}</span></Link>
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

export default EventsList