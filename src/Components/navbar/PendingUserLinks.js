import React from 'react'
import {NavLink } from 'react-router-dom'

const PendingUserLinks = (props) => {
    return(
            <div className="ui secondary stackable pointing menu">
                <div className="right menu">
                   <div className="item"><a onClick={props.logOut}>Logout</a></div>
                </div>
                       
            </div>

    )
}


export default (PendingUserLinks)