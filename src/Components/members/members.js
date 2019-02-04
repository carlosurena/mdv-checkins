import React, { Component } from 'react';
import MembersTable from './memberstable';
import AddMember from './addMember.js';
import SearchMember from './searchMember'
import M from "materialize-css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import { updateMembersList } from '../../store/actions/memberactions'
import { Button } from 'semantic-ui-react'
class Members extends Component {
  state = {


  }
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
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
    const { members, user } = this.props
    if(user.isEmpty) return <Redirect to='/signin' />
    if(members) console.log('we have '+ members.length +' members')
    return (
      <div className="members-page">
        
          <div className="ui teal inverted segment">
            <AddMember />
          </div>
        

        <div className="ui centered grid container">
          <div className="sixteen wide column ">
            <SearchMember members={members} />
            <MembersTable  members={members} />
          </div>
          <div className="column">
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  console.log('reduxstate',reduxState)
  return {
    members: reduxState.firestore.ordered.members,
    user: reduxState.firebase.auth
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
    { collection: 'members'  }
  ])
)(Members);
