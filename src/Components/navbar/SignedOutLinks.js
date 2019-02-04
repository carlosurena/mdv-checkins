import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        
            <div className="ui secondary pointing menu">
                <div className="right menu">
    
                        <div className="item"><NavLink to="/signin">Log In</NavLink></div>
                    
                </div>
            </div>

     
    )
}


export default (SignedOutLinks)