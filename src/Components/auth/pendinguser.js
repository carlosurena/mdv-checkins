import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class PendingUser extends Component {
  render() {
    const {user, auth} = this.props
    if(auth.isEmpty) return <Redirect to='/signin' />
    if(user && user.accessLevel === 'admin') return <Redirect to='/' />
    return (
      <div>
        Thank you for signing up. We've sent a notification to your administrators.
        Once they confirm your access, you'll be able to use the app immediately.
      </div>
    )
  }
}
const mapStateToProps = (reduxState) =>{
    return {
        auth : reduxState.firebase.auth,
        user : reduxState.auth.user
    }
}
export default connect(mapStateToProps)(PendingUser)
