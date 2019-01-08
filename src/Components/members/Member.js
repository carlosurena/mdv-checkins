import React, {Component} from 'react';
import {NavLink, Switch, Route, BrowserRouter} from 'react-router-dom'
import MemberStats from './memberstats'
import { Select } from 'semantic-ui-react'
class Member extends Component{

    state = {
        id: null,
        member: {"first_name": 'Carlos', "last_name": "Urena", "email":"carlosurenajr@gmail.com", "gender":"M", "phone": "2035227369", "dob" : "", "type": "Active", "createdOn": "", "updatedOn": "" },
    }
    componentDidMount(){
        let id = this.props.match.params.member_id;
        console.log(this.props)
        console.log(id)
        this.setState({
            id : id
        })
    }

    handleDropdownChange = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.value
        })
    }

    render(){
        const currentPath = "/member/" + this.state.id + "/";
        const membershipOptions = [
            {key: 'Visitor', value: 'Visitor', text: 'Visitor', text_esp: 'Visita'},
            {key: 'RegularVisitor', value: 'RegularVisitor', text: 'Regular Visitor', text_esp: 'Visita Regular'},
            {key: 'Passive', value: 'Passive', text: 'Passive Member', text_esp: 'Miembro Pasivo'},
            {key: 'Active', value: 'Active', text: 'Active Member', text_esp: 'Miembro Activo'} ]
        const member = this.state.member ? (
            <div className="">
                <div className="section green">
                    <div className="row valign-wrapper">
                        <div className="col s12 m4">
                            <h3>{this.state.member.first_name + " " + this.state.member.last_name}</h3>
                        </div>
                        <div className="col s12 m8">
                            <div className="valign-wrapper">
                               <Select placeholder='Membership Type' options={membershipOptions} value={this.state.member.type}>

                               </Select>
                                
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
                                <NavLink to={currentPath+"sections"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">access_time</i>
                                    <span> Check-Ins</span>
                                </li></NavLink>
                                <NavLink to={currentPath+"reports"}><li className="valign-wrapper">
                                    <i className="material-icons prefix">assessment</i>
                                    <span> Reports</span>
                                </li></NavLink>
                                
                            </ul>
                        </div>
                        <div className="col s12 m9 grey lighten-5 details-content">
                                <Switch>
                                    <Route exact path={currentPath} render={(props) => <MemberStats  id={this.state.id} member={this.state.member}/>} />
                                    <Route exact path={currentPath+"stats"} render={(props) => <MemberStats  id={this.state.id} member={this.state.member}/>} />
                                    <Route exact path={currentPath+"sections"} render={(props) => <MemberStats  id={this.state.id} member={this.state.member}/>} />
                                    <Route exact path={currentPath+"reports"} render={(props) => <MemberStats  id={this.state.id} member={this.state.member}/>} />
                                    <Route exact path={currentPath+"edit"} render={(props) => <MemberStats  id={this.state.id} member={this.state.member}/>} />
                                </Switch>
                                
                            
                        </div>
                    </div>
                
                
            </div>
        ) : (
            <div className="center">Could not find the requested member (member ID {this.state.id})...</div>
            )
        return(
            <BrowserRouter>
                <div>
                    {member}
                </div>
                    
                </BrowserRouter>
        );
    }
}
export default Member