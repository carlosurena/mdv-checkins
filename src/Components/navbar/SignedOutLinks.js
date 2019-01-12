import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        <div>
            <nav className="nav-wrapper green lighten-1">
                <div className="container">
                <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to="/signin">Log In</NavLink></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-nav">
            
                <li><NavLink to="/signin">Log In</NavLink></li>
            </ul>
        </div>
    )
}


export default (SignedOutLinks)