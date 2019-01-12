import React, {Component} from 'react'
import {Link, NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { logOut } from '../../store/actions/authActions'

class Navbar extends Component{
    
    state = {

    }
    render(){
        return(
            <div>
                {
                    this.props.user.isEmpty ? (
                        <SignedOutLinks />
                    ):(
                        <SignedInLinks logOut={this.props.logOut} />
                    )
                }
                
                
            </div>
        )
    }
    
}

const mapStateToProps = (reduxState) =>{
    console.log('redux state',reduxState)

    return{
        user: reduxState.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) =>{
    console.log('redux state',dispatch)

    return{
        logOut : () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)