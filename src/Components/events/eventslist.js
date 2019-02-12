import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Icon, Header } from 'semantic-ui-react'

const EventsList = ({events}) => {

    //const {events} = props;
   // console.log(props);
        return(
            
            <div className="inline">
                {console.log(events)}
                {events && events.map(event =>{
                    return( 

                            
                        <Card key={event.id}>
                            <Card.Content>
                                <Header><Link to={"/event/"+event.id}>{event.title}</Link></Header>
                            </Card.Content>
                            <Card.Content description={
                                event.isRecurring ? (<div>
                                    <p>Recurring Event</p>
                                    <p>Weekday: {event.weekday}</p>
                                    </div>) :
                                    (
                                        <div>
                                            <p>
                                                Single Event
                                            </p>
                                        </div>
                                    )
                            } />
                            <Card.Content extra>
                            <Icon name='user' />
                            Creator here
                            </Card.Content>
                        </Card>
                                

                            
                    )})
                }
        
            </div>
        )


}

export default EventsList