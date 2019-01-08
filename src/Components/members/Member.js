import React, {Component} from 'react';
import {NavLink, Switch, Route, BrowserRouter} from 'react-router-dom'
import MemberStats from './memberstats'
import { Select } from 'semantic-ui-react'
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

//var db = firebase.firestore();
class Member extends Component{

    state = {
        
    }
    componentDidMount(){
        // let id = this.props.match.params.member_id;
        // console.log(id)
        // var memberRef = db.collection("members").doc(id);
        // memberRef.get().then( member =>{
        //     console.log('member retrieved from firestore', member.data())
        //     this.setState({
        //         id : id,
        //         member: member.data()
        //     })
            
            

        // })
    }

    handleDropdownChange = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.value
        })
    }

    render(){
        const currentPath = "/member/" + this.state.id + "/";
        const memberID = this.props.match.params.member_id;
        const memberData = this.props.member
        
        console.log(memberData)
        const membershipOptions = [
            {key: 'Visitor', value: 'Visitor', text: 'Visitor', text_esp: 'Visita'},
            {key: 'RegularVisitor', value: 'RegularVisitor', text: 'Regular Visitor', text_esp: 'Visita Regular'},
            {key: 'Passive', value: 'Passive', text: 'Passive Member', text_esp: 'Miembro Pasivo'},
            {key: 'Active', value: 'Active', text: 'Active Member', text_esp: 'Miembro Activo'} ]
        const member = memberData ? (
            <div className="">
                <div className="section green">
                    <div className="row valign-wrapper">
                        <div className="col s12 m4">
                            <h3>{memberData[memberID].first_name + " " + memberData[memberID].last_name}</h3>
                        </div>
                        <div className="col s12 m8">
                            <div className="valign-wrapper">
                               <Select placeholder='Membership Type' options={membershipOptions} value={memberData[memberID].type}>

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
            <div className="center">Could not find the requested member (member ID: {this.props.match.params.member_id})...</div>
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

const mapStateToProps = (reduxState) =>{
    console.log("redux state",reduxState)
    return {
        member : reduxState.firestore.data.members
    }
}
export default compose(
    connect(mapStateToProps), 
    firestoreConnect(props =>[
        {
            collection: 'members',
            doc: props.match.params.member_id
        }
    ])
    )(Member)