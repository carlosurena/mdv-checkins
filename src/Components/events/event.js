import React, {Component} from 'react';
import EventStats from './eventstats';
import EventLocations from './eventlocations';
import EventReports from './eventreports';
import EventEdit from './eventedit';
import {NavLink, Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { deleteEvent } from '../../store/actions/eventactions'
import { createLocation } from '../../store/actions/locationactions'
import EventMenu from './eventMenu'
import EventSheets from './eventSheets'

class Event extends Component{

    state = {
        id: null,
        event: null,
        creator: null,
        eventDeleted : false,
        location : { title: 'General'}
    }
    componentDidMount(){
        

        this.setState({
            id : this.props.match.params.event_id
        })
        
    }

    handleDeleteEvent = (e) =>{
        console.log('deleting event', this.props);
        this.props.deleteEvent(this.state.id)
            this.setState({
                eventDeleted: true
            })
        
    }
    handleCreateLocation = () =>{
        console.log('deleting event', this.props);
        this.props.createLocation(this.state.id,this.state.location,this.props.user)
            
        
    }

    render(){
        const { user,auth } = this.props
        if(auth.isEmpty) return <Redirect to='/signin' />
        if(user && user.accessLevel == 'pending') return <Redirect to='/pendinguser' />
        if(user && user.accessLevel == 'volunteer') return <Redirect to='/' />
        
        if(this.state.eventDeleted === true){
            return <Redirect to='/events'/>
        }
        const currentPath = "/event/" + this.state.id + "/";
        const { event } = this.props
        var eventTab;
        if(this.props.activeItem === 'Info'){
            eventTab = <EventStats  id={this.state.id} event={this.props.event} creator={this.state.creator}/>
        }else if(this.props.activeItem === 'Locations'){
            eventTab = <EventLocations eventID={this.state.id} event={this.props.event} creator={this.state.creator} locations={this.props.locations} handleCreateLocation= {() =>{this.handleCreateLocation()}}/>
        }else if(this.props.activeItem === 'Reports'){
            eventTab = null
        }
        const eventRender = event ? (
            <div className="">
                <div className="ui inverted teal segment">
                            <div className="">
                                <div className="">
                                    <h3>{event.title}</h3>
                                </div>
                                <div className="">
                                    
                                    <Button negative onClick={this.handleDeleteEvent} content='Delete Event' />
                                    
                                </div> 
                            </div>
                </div>

                <EventMenu />
                <div>
                    {eventTab}
                </div>

                
                
            </div>
        ) : (
            <div className="">Could not find the requested event: {this.state.id}</div>
            )
        return(
           
                <BrowserRouter>
                <div>
                    {eventRender}
                </div>
                    
                </BrowserRouter>
           
        );
    }
}

const mapStateToProps = (reduxState, ownProps) =>{
    const id = ownProps.match.params.event_id;
    const events = reduxState.firestore.data.events;
    const event = events ? events[id] : null

    const locations = reduxState.firestore.ordered.locations
    //const location = events[id].locations ? events[id].locations : null
    console.log('reduxstate ',reduxState)
    return {
        auth : reduxState.firebase.auth,
        user : reduxState.auth.user,
        event : event,
        locations : locations,
        activeItem : reduxState.event.activeItem
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        createLocation: (eventID,location,user) => dispatch(createLocation(eventID,location,user))
        }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection:'events',
            doc : props.match.params.event_id,
            
        },
        {
            collection:'locations',
            where: [['eventRef', '==', props.match.params.event_id]],
            
        }
        
        
        
    ])

)(Event)