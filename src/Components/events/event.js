import React, {Component} from 'react';
import EventStats from './eventstats';
import EventSections from './eventsections';
import EventReports from './eventreports';
import EventEdit from './eventedit';
import {NavLink, Route, Switch, BrowserRouter} from 'react-router-dom';
import firebase from '../../firebase/firebase'

var db = firebase.firestore();
class Event extends Component{

    state = {
        id: null,
        event: null,
        creator: null
    }
    componentDidMount(){
        let id = this.props.match.params.event_id;
        var eventRef = db.collection("events").doc(id);
        eventRef.get().then( event =>{
            console.log('event retrieved from firestore', event.data())
            this.setState({
                id : id,
                event: event.data()
            })
            
            let memberRef = db.collection("members").doc(this.state.event.creatorID)
            memberRef.get().then( member =>{
            console.log('member retrieved from firestore', member.data())
            this.setState({
                creator : member.data()
            })
        })

        })

        
        
    }
    render(){
        const currentPath = "/event/" + this.state.id + "/";
        const event = this.state.event ? (
            <div className="">
                <div className="section green">
                    <h3>{this.state.event.title}</h3>
                </div>

                    <div className="row event-details-content">
                        <div className="col s12 m3 grey lighten-4 details-sidebar">
                            <ul>
                                <NavLink to={currentPath+"stats"}><li>
                                    Stats
                                </li></NavLink>
                                <NavLink to={currentPath+"sections"}><li>
                                    Sections
                                </li></NavLink>
                                <NavLink to={currentPath+"reports"}><li>
                                    Reports
                                </li></NavLink>
                                <NavLink to={currentPath+"edit"}><li>
                                    Edit Event
                                </li></NavLink>
                            </ul>
                        </div>
                        <div className="col s12 m9 grey lighten-5 details-content">
                           
                                <Switch>
                                    <Route exact path={currentPath} render={(props) => <EventStats  id={this.state.id} event={this.state.event}/>} />
                                    <Route exact path={currentPath+"stats"} render={(props) => <EventStats  id={this.state.id} event={this.state.event}/>} />
                                    <Route exact path={currentPath+"sections"} render={(props) => <EventSections  id={this.state.id} event={this.state.event}/>} />
                                    <Route exact path={currentPath+"reports"} render={(props) => <EventReports  id={this.state.id} event={this.state.event}/>} />
                                    <Route exact path={currentPath+"edit"} render={(props) => <EventEdit  id={this.state.id} event={this.state.event}/>} />
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
                    {event}
                </div>
                    
                </BrowserRouter>
           
        );
    }
}
export default Event