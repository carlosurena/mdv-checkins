import React, {Component} from 'react';
import EventStats from './eventstats';
import EventSections from './eventsections';
import EventReports from './eventreports';
import EventEdit from './eventedit';
import {NavLink, Route, Switch, BrowserRouter} from 'react-router-dom';

class Event extends Component{

    state = {
        id: null,
        event:{ id: 3, title: "Manantiales de vida", type: "recurring", startDate: "2/4/2019", endDate: "2/72019", createdOn : "12/30/2018", creatorID : 23254 }
        
    }
    componentDidMount(){
        let id = this.props.match.params.event_id;
        console.log(this.props)
        console.log(id)
        this.setState({
            id : id
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