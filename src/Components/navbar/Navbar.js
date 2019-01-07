import React from 'react'
import {Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="nav-wrapper green lighten-1">
            <div className="container">
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/members">Members</NavLink></li>
                    <li><NavLink to="/events">Events</NavLink></li>
                    <li><NavLink to="/account">Account</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar