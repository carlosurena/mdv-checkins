import React, {Component} from 'react';
import {BrowserRouter, Redirect} from 'react-router-dom'
import MemberStats from './memberstats'
import { Button,Icon, Image, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { deleteMember } from '../../store/actions/memberactions';
import MemberMenu from './memberMenu'
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
        const { user, auth } = this.props
        if(auth.isEmpty) return <Redirect to='/signin' />
        if(user && user.accessLevel === 'pending') return <Redirect to='/pendinguser' />
        if(user && user.accessLevel === 'volunteer') return <Redirect to='/' />

        if(this.state.eventDeleted === true){
            return <Redirect to='/members'/>
        }
        const { member } = this.props
        var memberTab;
        console.log('member tab active item', this.props.activeItem)
        if(this.props.activeItem === 'Info'){
            memberTab = <MemberStats member={member} />
        }else if(this.props.activeItem === 'Other'){
            memberTab = null
        }else if(this.props.activeItem === 'Reports'){
            memberTab = null
        }

        var memberTypeOptions = [{ key: 'Arabic', text: 'Arabic', value: 'Arabic' }, { key: 'Arabic', text: 'Arabic', value: 'Arabic' }];

        const memberRender = member ? (
            <div className="">
                <div className="ui inverted teal segment">
                            <div className="ui center aligned padded grid">
                                <div className="row">
                                    <div className="column">
                                        <Image size='tiny' circular centered src='https://react.semantic-ui.com/images/wireframe/square-image.png'></Image>
                                    </div>
                                </div>
                                <div className="row">
                                    <h2>{member.first_name} {member.last_name}</h2>
                                    
                                </div>
                                
                                <div className="row">
                                    { (member.email) ? (
                                        <div className="column">
                                            <Icon name='mail'>
                                            </Icon>
                                            {member.email}
                                        </div>                                    ):
                                    (
                                        null
                                    )}
                                    { (member.phone) ? (
                                        <div className="column">
                                            <Icon flipped='horizontally' name='phone'>
                                            </Icon>
                                            {member.phone}
                                        </div>
                                    ):
                                    (
                                        null
                                    )}
                                </div>
                                <div className="row">
                                <Dropdown
                                    button
                                    className='icon'
                                    floating
                                    labeled
                                    icon='world'
                                    options={memberTypeOptions}
                                    search
                                    text='Select Language'
                                />

                                    <Button negative onClick={this.handleDeleteMember} content='Delete Member' />
                                    
                                </div> 
                            </div>
                </div>

                <MemberMenu />
                <div className="ui container">
                    {memberTab}
                </div>

                
                
            </div>
        ) : (
            <div className="">Could not find the requested member: {this.state.id}</div>
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
        auth : reduxState.firebase.auth,
        user: reduxState.auth.user,
        activeItem: reduxState.member.activeItem
        

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