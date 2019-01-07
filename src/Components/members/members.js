import React, { Component } from 'react';
import MembersTable from './memberstable';
import AddMember from './addMember.js';
import SearchMember from './searchMember'
import M from "materialize-css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Members extends Component {
  state = {
    
   
  }
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }
  addMember = (member) => {
    member.id = Math.random();
    
    let newMemberList = [...this.state.members, member];
    console.log(newMemberList);
    this.setState(prevState => ({
      members: [...prevState.members, member]
    }))
    //console.log(this.state);
  }

  deleteMember = (id) => {
    let members = this.state.members.filter(member => {
      return member.id !== id
    });
    
    this.setState({
      members: members
    })
  }

  handleModal = (e) =>{
   
  }
  render() {
    const {members} = this.props
    console.log(members)
    return (
      <div className="members-page">
        <div className="section green">
          <div className="row container">
            <button data-target="addMemberModal" className="btn modal-trigger right waves-effect" onClick={this.handleModal}>
            <i className="material-icons">person_add</i>
            <p>New Member</p>
            </button>

          </div>
        </div>
        
      <div className="section">
        <div className="container">
          <SearchMember />
          <MembersTable deleteMember={this.deleteMember} members = {members} />
        
        </div>
       <AddMember addMember = {this.addMember}/>

      </div>
       
       
        
        
      
       
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log(state)
  return {
      members: state.firestore.ordered.members
  }
}

export default compose(
  connect(mapStateToProps), 
  firestoreConnect([
    {collection: 'members'}
  ])
  )(Members);
