import React, {Component} from 'react';
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
        const {user,auth } = this.props
        if(auth.isEmpty) return <Redirect to='/signin' />
        if(user && user.accessLevel === 'pending') return <Redirect to='/pendinguser' />
        if(user && user.accessLevel === 'volunteer') return <Redirect to='/' />

        return(
            <div className="">
                <div className="ui green inverted segment">
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
        auth: reduxState.firebase.auth,
        user: reduxState.auth.user
    }
  }
  
  export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
      {collection: 'events'}
    ])
    )(Events);