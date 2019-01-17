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
import { deleteEvent,createLocation } from '../../store/actions/eventactions'

class Event extends Component{

    state = {
        id: null,
        event: null,
        creator: null,
        eventDeleted : false,
        location : { title: 'Big kids'}
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
        const { user } = this.props
        if(user.isEmpty) return <Redirect to='/signin' />
        if(this.state.eventDeleted === true){
            return <Redirect to='/events'/>
        }
        const eventID = this.props.match.params.event_id;
        const currentPath = "/event/" + this.state.id + "/";
        const { event } = this.props
        const eventRender = event ? (
            <div className="">
                <div className="section green">
                        <div className="row valign-wrapper">
                            <div className="col s12 m4">
                                <h3>{event.title}</h3>
                            </div>
                            <div className="col s12 m8">
                                <div className="valign-wrapper">
                                
                                <Button primary color='red' onClick={this.handleDeleteEvent} content='Delete Event' />
                                </div>
                                
                            </div> 
                        </div>
                </div>

                    <div className="row event-details-content">
                    <div className="col s12 m3 grey lighten-4 details-sidebar">
                            <ul>
                                <NavLink to={currentPath+"stats"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">create</i>
                                    <span> Information</span>
                                </li></NavLink>
                                <NavLink to={currentPath+"locations"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">access_time</i>
                                    <span> Locations</span>
                                </li></NavLink>
                                <NavLink to={currentPath+"sheets"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">assessment</i>
                                    <span> Attendance Sheets</span>
                                </li></NavLink>
                                <NavLink to={currentPath+"reports"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">assessment</i>
                                    <span> Reports</span>
                                </li></NavLink>
                                
                            </ul>
                        </div>
                        <div className="col s12 m9 grey lighten-5 details-content">
                           
                                <Switch>
                                    <Route exact path={currentPath} render={() => <EventStats  id={this.state.id} event={this.props.event} creator={this.state.creator}/>} />
                                    <Route exact path={currentPath+"stats"} render={() => <EventStats  id={this.state.id} event={this.props.event} creator={this.state.creator}/>} />
                                    <Route exact path={currentPath+"locations"} render={() => <EventLocations  id={this.state.id} event={this.props.event} creator={this.state.creator}  handleCreateLocation= {() =>{this.handleCreateLocation()}}/>} />
                                    <Route exact path={currentPath+"reports"} render={() => <EventStats  id={this.state.id} event={this.props.event} creator={this.state.creator}/>} />
                                </Switch>
                                
                            
                        </div>
                    </div>
                
                
            </div>
        ) : (
            <div className="center">Could not find the requested event (EVENT ID: {this.state.id})</div>
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
    //const locations = reduxState.firestore.data.events[id].locations
    //const location = events[id].locations ? events[id].locations : null
    console.log('event ',event)
    return {
        user : reduxState.firebase.auth,
        event : event,
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
            collection:'events'
        }
    ])

)(Event)