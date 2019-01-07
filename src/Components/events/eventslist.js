import React from 'react';
import {Link} from 'react-router-dom'

const EventsList = ({events}) => {

    //const {events} = props;
   // console.log(props);
    const eventsList = events.map( event => {
        console.log("returning event " + event.id)
        let linkPath = "/event/"+event.id;
        return(
            
        

            <div className="card z-depth-1" key={event.id}>
                <div className="card-content">
                    <Link to={linkPath}><span className="card-title">{event.title}</span></Link>
                    <p>Type: {event.type}</p>
                    <p> Created on: {event.createdOn}</p>
                    <p> Next Occurence: {event.weekday}</p>
                </div>
            </div> 
        )})
        
        return(
            <div className="">
               
                    {eventsList}
                
            </div>
        )


}

export default EventsList