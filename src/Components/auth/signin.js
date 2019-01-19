import React, { Component } from 'react'
import firebase,{auth} from '../../firebase/firebase';
import {connect} from 'react-redux'
import {loginGoogle,loginFacebook} from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class SignIn extends Component {

    

  render() {
    const { user } = this.props
    if(!user.isEmpty) return <Redirect to='/' />
    return (
      <div className='container section'>
        
        <div className="center">
            <button onClick={this.props.loginFacebook} className="btn blue darken-3 z-depth-0">
                        Login with Facebook
            </button>
        </div>
       
        <div className="center">
            <button onClick={this.props.loginGoogle} className="btn red lighten-1 z-depth-0">
                        Login with Google
            </button>
        </div>

        
            {this.props.authError ? (
                null
                ):(
                    <div className="centered">
                        <p>{this.props.authError}</p>
                        
                    </div>
                )}

        
      </div>
    )
  }
}

const mapStateToProps = (reduxState) =>{
    return{
        authError : reduxState.auth.authError,
        user : reduxState.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        loginGoogle : () => dispatch(loginGoogle()),
        loginFacebook : () => dispatch(loginFacebook())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
