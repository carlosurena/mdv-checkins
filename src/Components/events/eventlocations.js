import React, { Component } from 'react';
import M from 'materialize-css';
import {Button} from 'semantic-ui-react'

class EventLocations extends Component {
 state = {
   sections: [ "Eyri", 'Jovenes', 'Beatriz', 'Karla', 'Orlando', 'Marcela']

 }
 componentDidMount() {
  // Auto initialize all the things!
  M.AutoInit();
}
  render() {
    const {locations,event} = this.props
    console.log(locations)
    return (
      <div>
        <div className="container section">
            <h4>Locations</h4>
            <Button onClick={() =>{this.props.handleCreateLocation()}} >Add Location</Button>
            <div className="row">
              
                

                  {locations ? (
                    <div>
                      {locations.map(location =>{
                        return(
                          <div key={location.id} className='card'>{location.title}</div>
                        )
                      })
                      }
                    </div>
                  ) : (
                    null
                  )}      
                    
                
                
                
            </div>
        </div>
      </div>
    )
  }
}

export default EventLocations 
