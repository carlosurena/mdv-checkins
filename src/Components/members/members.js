import React, { Component } from 'react';
import MembersTable from './memberstable';
import AddMember from './addMember.js';
import SearchMember from './searchMember'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import { updateMembersList } from '../../store/actions/memberactions'
import { Button } from 'semantic-ui-react'
import AccessRequests from '../auth/accessRequests'
import { getFirestore } from 'redux-firestore';
import { request } from 'http';
class Members extends Component {
  state = {
    requestsIsEmpty: true,
    viewRequests : false
  }
  componentDidMount() {
    const { requests } = this.props;
    this.props.updateMembersList();
    console.log('component remounted')
    if(requests && requests.length > 0){
      this.isRequestsEmpty(false)
    }else{
      this.isRequestsEmpty(true)
    }
  }

  isRequestsEmpty = (empty) => {
    this.setState({
      requestsIsEmpty : empty
    })
  } 

  componentDidUpdate(prevProps){
    // console.log(prevProps.sheet,this.props.sheet)
    console.log('component did update', prevProps.members,this.props.members)

    if(prevProps.members && this.props.members){
      if(prevProps.members.length !== this.props.members.length){
        console.log('discrepancy in size')
        //this.updateList()
    }
    }
    
     
 }



  render() {
    const { members, user, auth , requests } = this.props

    if(auth.isEmpty) return <Redirect to='/signin' />
    if(user && user.accessLevel == 'pending') return <Redirect to='/pendinguser' />
    if(members) console.log('we have '+ members.length +' members')

    //Only render pending user UI warning message if requests is populated with pending users
    if(requests) console.log("Pending users: " + requests.length);
    

    return (
      <div className="members-page">
        
          <div className="ui teal inverted segment">
            <AddMember />
          </div>

        { (!this.state.viewRequests) ? 
        (
        <div className="ui centered grid container">
          <div className="sixteen wide column ">
          { ( requests && requests.length > 0) ? 
          (
            <a onClick={() => this.setState({ viewRequests: true})}><div className="ui warning message">
                <div className="header">
                  You have pending access level requests.
                </div>
                <p>Please click here to review them.</p>
              </div>
              <div className="ui divider"></div>
            </a>
           ) 
           :
           ( 
            console.log("REQUESTS IS EMPTY")
           )
          }
            <SearchMember members={members} />
            <div className="ui hidden divider"></div>
            <MembersTable  members={members} />
          </div>
          <div className="column">
          </div>

        </div>
        ) 
        :
        (
          <div className="ui centered grid container">
            <div className="sixteen wide column">
              <Button onClick={() => this.setState({ viewRequests: false})}>Back</Button>
              <div className="ui hidden divider"></div>
              <div>
                <AccessRequests requests={requests} members = {members} />
              </div>
            </div>

          </div>
        )
        }
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  console.log('reduxstate',reduxState)
  return {
    members: reduxState.firestore.ordered.members,
    auth: reduxState.firebase.auth,
    user: reduxState.auth.user,
    requests : reduxState.firestore.ordered.requests
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateMembersList: () => dispatch(updateMembersList())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'members'  },
    { collection : 'requests'}
  ])
)(Members);


