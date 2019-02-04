import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import EventsList from './eventslist';
import CreateEvent from './createEvent';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Events extends Component {
    state = {
      
       
      }

    componentDidMount() {

    }
    render(){
        const {user } = this.props
        if(user.isEmpty) return <Redirect to='/signin' />
        return(
            <div className="">
                <div className="ui teal inverted segment">
                    <CreateEvent />
                </div>
        
                <div className="ui centered grid container">
                    <div className="sixteen wide column">
                        
                            <h1>Events</h1>
                            <EventsList events={this.props.events} />
                            
                            
                            
                        
                        
                    </div>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) =>{
    console.log(reduxState)
    return {
        events: reduxState.firestore.ordered.events,
        user: reduxState.firebase.auth
    }
  }
  
  export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
      {collection: 'events'}
    ])
    )(Events);