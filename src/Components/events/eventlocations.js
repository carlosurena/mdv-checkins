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
              
                <div className="col s12">
                    <ul className="tabs">
                    {locations && locations.map(location =>{
                      return(
                        
                        <li key={location.id} className="tab col s3"><a href={"#"+location.id}>{location.title}</a></li>
                      )
                    })}
                        
                    </ul>
                </div>
                <div>
                {locations && locations.map(location =>{
                      return(
                        
                        <div key={location.id} id={location.id} className="col s12"> CONTENT FOR {location.title}</div>)
                    })}
                  
                </div>
                
            </div>
        </div>
      </div>
    )
  }
}

export default EventLocations 
