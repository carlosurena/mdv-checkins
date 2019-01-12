import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedInLinks = (props) => {
    return(
        <div>
            <nav className="nav-wrapper green lighten-1">
                <div className="container">
                <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to="/">Check-In</NavLink></li>
                        <li><NavLink to="/members">Members</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/account">Account</NavLink></li>
                        <li><a onClick={props.logOut}>Logout</a></li>

                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-nav">
            <li><NavLink to="/">Check-In</NavLink></li>
                <li><NavLink to="/members">Members</NavLink></li>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
                <li><NavLink to="/signin">Logout</NavLink></li>

            </ul>
        </div>
    )
}


export default (SignedInLinks)