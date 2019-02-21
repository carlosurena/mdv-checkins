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
class Members extends Component {
  state = {
    viewRequests : false
  }
  componentDidMount() {
    this.props.updateMembersList();
    console.log('component remounted')
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
    if(user && user.accessLevel === 'pending') return <Redirect to='/pendinguser' />
    if(user && user.accessLevel === 'volunteer') return <Redirect to='/' />

    if(members) console.log('we have '+ members.length +' members')
    return (
      <div className="members-page">
        
          <div className="ui teal inverted segment">
            <AddMember />
          </div>
        

        { (!this.state.viewRequests) ? 
        (
        <div className="ui centered grid container">
          <div className="sixteen wide column ">
            <a onClick={() => this.setState({ viewRequests: true})}><div className="ui warning message">
                <div className="header">
                  You have pending access level requests.
                </div>
                <p>Please click here to review them.</p>
              </div>
            </a>
            <div className="ui divider"></div>
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
