import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Account extends Component {
  render() {
    const {user} = this.props
    if(user.isEmpty) return <Redirect to='/signin' />
    var loginProvider = 'N/A'
    console.log(user.providerData[0].providerId)
    if(user.providerData[0].providerId === 'facebook.com') {
        loginProvider = 'Facebook'
    }else if(user.providerData[0].providerId === 'google.com'){
        loginProvider = 'Google'

    }
    return (
      <div>
        <div>
            <img src={user.photoURL} alt=""/>    
            <p>User logged in as: {user.displayName}</p>
            <p>email: {user.email} </p>
            <p>Login Provider: {loginProvider}</p>
           
            
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) =>{

    return{
        user : reduxState.firebase.auth
    }
}
export default connect(mapStateToProps)(Account)
