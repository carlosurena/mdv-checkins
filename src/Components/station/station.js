import React, {Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import StationSearch from './stationSearch'

class Station extends Component {
    render(){
        const { user,members } = this.props
        if(user.isEmpty) return <Redirect to='/' />
        return(
            <div className="section green lighten-4 station-container">
                <div className="row container">
                    <StationSearch members={members}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) =>{
    return {
        user : reduxState.firebase.auth,
        members : reduxState.firestore.ordered.members
    }
}
export default connect(mapStateToProps)(Station)