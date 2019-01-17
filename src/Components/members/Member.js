import React, {Component} from 'react';
import {NavLink, Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import MemberStats from './memberstats'
import { Select,Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { deleteMember } from '../../store/actions/memberactions';

//var db = firebase.firestore();
class Member extends Component{

    state = {
        id:'',
        first_name:'',
        last_name:'',
        dob:'',
        gender:'',
        phone:'',
        type:'',
        memberDeleted : false
    }
    componentDidMount(){
        this.setState({

            id: this.props.match.params.member_id
        })
    }

    handleDropdownChange = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.value
        })
    }

    handleDeleteMember = (e) =>{
        console.log('deleting member', this.props);
        this.props.deleteMember(this.state.id)
            this.setState({
                memberDeleted: true
            })
        
        

    }
    render(){
        const { user } = this.props
        if(user.isEmpty) return <Redirect to='/signin' />
        if(this.state.memberDeleted === true){
            return <Redirect to='/members'/>
        }
        const memberID = this.props.match.params.member_id;
        const currentPath = "/member/" + memberID + "/";
        const { member} = this.props
        
        console.log('member props',this.props)
        const memberRender = member ? (
            <div className="">
                <div className="section green">
                    <div className="row valign-wrapper">
                        <div className="col s12 m4">
                            <h3>{member.first_name + " " + member.last_name}</h3>
                        </div>
                        <div className="col s12 m8">
                            <div className="valign-wrapper">
                               
                            <Button primary color='red' onClick={this.handleDeleteMember} content='Delete Member' />
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
                                <NavLink to={currentPath+"checkins"}><li className="valign-wrapper">
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
                                    <Route exact path={currentPath} component={MemberStats} />
                                    <Route exact path={currentPath+"stats"} component={MemberStats} />
                                    <Route exact path={currentPath+"checkins"} component={MemberStats}  />
                                    <Route exact path={currentPath+"reports"}  component={MemberStats} />
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
                    {memberRender}
                </div>
                    
                </BrowserRouter>
        );
    }
}

const mapStateToProps = (reduxState,ownProps) =>{
    console.log("redux state",reduxState)
    const id = ownProps.match.params.member_id;
    const members = reduxState.firestore.data.members;
    const member = members ? members[id] : null
    return {
        member : member,
        user : reduxState.firebase.auth
        

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        deleteMember: (member) => dispatch(deleteMember(member))
        }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps), 
    firestoreConnect(props =>[
        {
            collection: 'members'
        }
    ])
    )(Member)