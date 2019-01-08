import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import EventsList from './eventslist';
import CreateEvent from './createEvent';
import M from "materialize-css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Events extends Component {
    state = {
      
       
      }

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }
    render(){
        return(
            <div className="">
                <div className="section green">
                    <div className="row container">
                    <button data-target="createEventModal" className="btn modal-trigger right waves-effect">New Event</button>
                        <Link to="/station"><button className="right blue lighten-2 btn">Create a Station</button></Link>
                    </div>
                    </div>
                <div className="section container">
                    <div className="row">
                        <div className="col s12 l6">
                            <h1>Events</h1>
                            <EventsList events={this.props.events} />
                            
                            <CreateEvent />
                            
                        
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        events: state.firestore.ordered.events
    }
  }
  
  export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
      {collection: 'events'}
    ])
    )(Events);