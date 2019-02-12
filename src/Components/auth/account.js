import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Account extends Component {
  render() {
    const {user, auth} = this.props
    if(auth.isEmpty) return <Redirect to='/signin' />
    
    return (
      <div>
        <div>
            <img src={user && user.photoURL} alt=""/>    
            <p>User logged in as: {user && (user.first_name +" "+ user.last_name)}</p>
            <p>email: {user && user.email} </p>
            <p>Login Provider: {user && user.provider}</p>
            <p>First Time login?: Not Implemented yet</p>
            <p>Access Level: {user && user.accessLevel}</p>
            
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) =>{

    return{
        auth : reduxState.firebase.auth,
        user : reduxState.auth.user
    }
}
export default connect(mapStateToProps)(Account)
