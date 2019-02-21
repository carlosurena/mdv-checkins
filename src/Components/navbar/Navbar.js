import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminLinks from './AdminLinks'
import SignedOutLinks from './SignedOutLinks'
import { logOut } from '../../store/actions/authActions'
import PendingUserLinks from './PendingUserLinks';
import VolunteerLinks from './VolunteerLinks'

class Navbar extends Component{
    
    state = {

    }
    componentDidMount() {
   
    }
    render(){
        const { auth, user } = this.props
        var link;
        if(user && user.accessLevel === 'pending'){
            link = <PendingUserLinks logOut={this.props.logOut}/>
        }else if(user && user.accessLevel === 'admin'){
            link = <AdminLinks logOut= {this.props.logOut}/>
        }else if(user && user.accessLevel === 'volunteer'){
            link = <VolunteerLinks logOut= {this.props.logOut}/>
        }
        return(
            <div>
                {
                    auth.isEmpty ? (
                        <SignedOutLinks />
                    ):(
                        link
                    )
                }
                
                
            </div>
        )
    }
    
}

const mapStateToProps = (reduxState) =>{
    //console.log('redux state',reduxState)

    return{
        auth: reduxState.firebase.auth,
        user: reduxState.auth.user
    }
}
const mapDispatchToProps = (dispatch) =>{
    //console.log('redux state',dispatch)

    return{
        logOut : () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)