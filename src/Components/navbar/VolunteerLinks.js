import React from 'react'
import {NavLink } from 'react-router-dom'

const VolunteerLinks = (props) => {
    return(
            <div className="ui secondary stackable pointing menu">
                <div className="right menu">
                    <div className="item"><NavLink to="/">Check-In</NavLink></div>
                    <div className="item"><NavLink to="/account">Account</NavLink></div>
                    <div className="item"><a onClick={props.logOut}>Logout</a></div>

                </div>
                       
            </div>

    )
}


export default (VolunteerLinks)