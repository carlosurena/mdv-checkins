import React from 'react'

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